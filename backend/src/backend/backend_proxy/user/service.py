from backend.backend_proxy.db.mongoDB import MongoDB
from backend.backend_proxy.user.schema import UserSchema
from backend.backend_proxy.api.exception import REST_Exception
import backend.backend_proxy.misc.util as util
from bson.objectid import ObjectId
import datetime as dt
import requests
import bcrypt
import json


class UserService:
    __instance = None

    @staticmethod
    def getInstance():
        """ Static access method. """
        if UserService.__instance == None:
            UserService.__instance = UserService()
        return UserService.__instance

    def login_user(self, req_dict):
        user = MongoDB.getInstance().find(
            "user", {"username": req_dict["username"]})
        if user is None:
            raise REST_Exception(
                "User {} does not exist".format(req_dict["username"]))
        if bcrypt.checkpw(req_dict["password"].encode('utf-8'), user["password"]):
            user["last_seen_at"] = dt.datetime.now()
            MongoDB.getInstance().update(
                "user", {"username": user["username"]}, user)
            return user
        else:
            raise REST_Exception("Password is incorrect...")

    def delete_tool(self, access_tools, enum):
        if (access_tools is not None) and (enum not in access_tools):
            raise REST_Exception("You have no right to update this tool")
        users = MongoDB.getInstance().find_all("user")
        tool = MongoDB.getInstance().find("tools", {"enum": enum})
        tool_id = str(tool["_id"])
        for user in users:
            if ((user["tools"] is not None) and
                    (tool_id in user["tools"])):
                user["tools"].remove(tool_id)
                MongoDB.getInstance().update("user",
                                             {"username": user["username"]}, user)

    def register_user(self, req_dict, session):
        # token is needed since registration can be done only by admins
        self.assert_logged_in(session)
        session_user = MongoDB.getInstance().find("user",
                                                  {"username": session["username"]})
        self.assert_still_exists(session_user, session)
        if "admin" not in session_user["roles"]:
            raise REST_Exception("You have no right to register a user.")
        if MongoDB.getInstance().find("user", {"username": req_dict["username"]}) is not None:
            raise REST_Exception(
                "Username: {} already exists".format(req_dict["username"]))
        password = req_dict["password1"]
        if password != req_dict["password2"]:
            raise REST_Exception("Password don't match.")
        pass_hashed = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
        user = {k: req_dict[k]
                for k in ["username", "email", "roles"]}
        if "tools" in req_dict:
            user["tools"] = self.enums_to_ids(req_dict["tools"])
        else:
            user["tools"] = []
        user["password"] = pass_hashed
        user["last_seen_at"] = dt.datetime.now()
        user["registered_at"] = user["last_seen_at"]
        MongoDB.getInstance().create("user", user)
        return self.dump(user)

    def delete_user(self, username, session):
        self.assert_logged_in(session)
        session_user = MongoDB.getInstance().find("user",
                                                  {"username": session["username"]})
        self.assert_still_exists(session_user, session)
        if "admin" not in session_user["roles"]:
            raise REST_Exception("You have no right to delete a user.")
        MongoDB.getInstance().delete("user", {"username": username})

    def update_cur_user_info(self, req_dict, session):
        self.assert_logged_in(session)
        original_username = session["username"]
        target_user = MongoDB.getInstance().find("user",
                                                 {"username": original_username})
        self.assert_still_exists(target_user, session)

        target_keys = ["email", "username"]
        if (original_username != req_dict["username"] and
                MongoDB.getInstance().find("user", {"username": req_dict["username"]}) is not None):
            raise REST_Exception("Username: {} already taken"
                                 .format(req_dict["username"]))
        for key in target_keys:
            target_user[key] = req_dict[key]
        target_user["last_seen_at"] = dt.datetime.now()
        MongoDB.getInstance().update("user",
                                     {"username": original_username}, target_user)
        session["username"] = req_dict["username"]
        return self.dump(target_user)

    def update_cur_user_pass(self, req_dict, session):
        self.assert_logged_in(session)
        original_username = session["username"]
        target_user = MongoDB.getInstance().find("user",
                                                 {"username": original_username})
        self.assert_still_exists(target_user, session)

        password = req_dict["password1"]
        if password != req_dict["password2"]:
            raise REST_Exception("Passwords don't match.")
        pass_hashed = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
        target_user["password"] = pass_hashed
        target_user["last_seen_at"] = dt.datetime.now()
        MongoDB.getInstance().update("user",
                                     {"username": original_username}, target_user)
        return self.dump(target_user)

    def update_other_user(self, original_username, req_dict, session):
        self.assert_logged_in(session)
        session_user = MongoDB.getInstance().find("user",
                                                  {"username": session["username"]})
        if "admin" not in session_user["roles"]:
            raise REST_Exception("You can't update others")
        target_keys = ["email", "username"]
        if (original_username != req_dict["username"] and
                MongoDB.getInstance().find("user", {"username": req_dict["username"]}) is not None):
            raise REST_Exception("Username: {} already taken"
                                 .format(req_dict["username"]))

        target_user = MongoDB.getInstance().find("user",
                                                 {"username": original_username})
        if "password1" in req_dict and req_dict["password1"]:
            password = req_dict["password1"]
            if password != req_dict["password2"]:
                raise REST_Exception("Passwords don't match.")
            pass_hashed = bcrypt.hashpw(
                password.encode('utf-8'), bcrypt.gensalt())
            target_user["password"] = pass_hashed

        for key in target_keys:
            target_user[key] = req_dict[key]
        MongoDB.getInstance().update("user",
                                     {"username": original_username}, target_user)
        return self.dump(target_user)

    def add_tool_to_user(self, session, tool_enum):
        self.assert_logged_in(session)
        username = session["username"]
        session_user = MongoDB.getInstance().find(
            "user", {"username": username})
        if "admin" in session_user["roles"]:
            return
        self.assert_still_exists(session_user, session)
        session_user["tools"].extend(self.enums_to_ids([tool_enum]))
        MongoDB.getInstance().update(
            "user", {"username": username}, session_user)
        return self.dump(session_user)

    def get_current_user(self, session):
        self.assert_logged_in(session)
        session_user = MongoDB.getInstance().find("user",
                                                  {"username": session["username"]})
        if "admin" in session_user["roles"]:
            session_user["tools"] = self.get_all_tool_ids()
        self.assert_still_exists(session_user, session)
        return self.dump(session_user)

    def get_users(self, session):
        self.assert_logged_in(session)
        session_user = MongoDB.getInstance().find("user",
                                                  {"username": session["username"]})
        self.assert_still_exists(session_user, session)
        if "admin" not in session_user["roles"]:
            raise REST_Exception("You don't have the right to see other users")
        users = MongoDB.getInstance().find_all("user",)
        return [self.dump(user) for user in users]

    def get_tools_user(self, session):
        self.assert_logged_in(session)
        session_user = MongoDB.getInstance().find("user",
                                                  {"username": session["username"]})
        self.assert_still_exists(session_user, session)
        if "admin" in session_user["roles"]:
            # None is special placeholder for all tools
            return None
        else:
            tools = session_user["tools"]
            tools = [] if tools is None else tools
            tools = self.ids_to_enums(tools)
            return tools

    def assert_logged_in(self, session):
        if "username" not in session:
            raise REST_Exception("You are not logged in.", 401)

    def assert_still_exists(self, session_user, session):
        if session_user is None:
            session.clear()
            raise REST_Exception("Your session is expired", 401)

    def dump(self, obj):
        obj["tools"] = self.ids_to_enums(obj["tools"])
        return UserSchema(exclude=['_id', 'password']).dump(obj)

    def enums_to_ids(self, enums):
        return [str(MongoDB.getInstance().find("tools", {"enum": enum})["_id"])
                for enum in enums]

    def ids_to_enums(self, ids):
        return [MongoDB.getInstance().find("tools", {"_id": ObjectId(id)})["enum"]
                for id in ids]

    def get_all_tool_ids(self):
        all_tools = MongoDB.getInstance().find_all("tools")
        return [t["_id"] for t in all_tools]
