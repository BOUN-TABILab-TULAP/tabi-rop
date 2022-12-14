import re
import secrets
from backend.backend_proxy.db.mongoDB import MongoDB
from backend.backend_proxy.user.authentication import hash_password
from backend.backend_proxy.user.controller.abstract_controller import AbstractUserController
from backend.backend_proxy.user.schema import UserSchema
from backend.backend_proxy.api.exception import REST_Exception
import backend.backend_proxy.misc.util as util
from backend.backend_proxy.user.user_class import User
from backend.backend_proxy.user.controller.user_controller import UserController
from backend.backend_proxy.user.user_type import UserType
from bson.objectid import ObjectId
import datetime as dt
import bcrypt


class UserService:
    __instance__ = None
    _initialized = False

    def __new__(cls, *args, **kwargs):
        if cls.__instance__ is None:
            cls.__instance__ = object.__new__(cls)
        return cls.__instance__

    def __init__(self, controller=None) -> None:
        if self._initialized:
            return
        self._initialized = True
        if controller is None:
            self.controller = UserController()
        else:
            self.controller: AbstractUserController = controller

    def login_user(self, req_dict) -> dict:
        if 'username' not in req_dict:
            raise REST_Exception("You must provide an username")

        username = req_dict['username']
        user: User = self.controller.get_user_query({"username": username})

        if user is None:
            raise REST_Exception(
                f"User {username} does not exist")

        if not bcrypt.checkpw(req_dict["password"].encode('utf-8'), user.password):
            raise REST_Exception("Password is incorrect", status=400)

        user.last_seen_at = dt.datetime.now().strftime('%Y-%m-%dT%H:%M:%S')
        user.token = secrets.token_hex(16)
        self.controller.update_user(user_id=user._id,
                                    user_info=UserSchema.dump(user=user, include_credentials=True))
        return {"username": user.username, "token": user.token, "user_type": UserType.enumToStr(user.type_enum)}

    def create_user(self, req_dict: dict, token: str):
        is_authorized = self.is_authorized(token=token)
        if not is_authorized:
            raise REST_Exception(
                "You are not authorized to create a new user", status=400)
        if 'username' not in req_dict:
            raise REST_Exception("You must provide an username", status=400)
        username = req_dict['username']
        if self.controller.get_user_query(query={"username": username}) != None:
            raise REST_Exception("Username is already taken", status=400)
        if 'password' not in req_dict:
            raise REST_Exception("You must provide a password", status=400)
        if 'email' not in req_dict:
            raise REST_Exception("You must provide an email", status=400)

        pass_hashed = hash_password(password=req_dict['password'])
        user = {"username": req_dict['username'],
                "password": pass_hashed,
                "type_enum": "standart",
                "email": req_dict['email'], }
        is_successful = self.controller.create_user(user_info=user)
        return is_successful

    def get_users(self, token: str):
        is_authorized = self.is_authorized(token=token)
        if not is_authorized:
            raise REST_Exception(
                "You don't have the right to see other users", status=401)
        users = self.controller.get_all_users()
        return [UserSchema.dump(user) for user in users]

    def get_user_query(self, query: dict) -> User:
        return self.controller.get_user_query(query=query)

    def delete_user(self, user_id: str, token: str) -> bool:
        deleting_user = UserService().get_user_query(query={"token": token})
        if deleting_user is None:
            raise REST_Exception(
                message="You are not authorized to delete this user")

        is_authorized = deleting_user.type_enum == UserType.administrator or user_id == deleting_user._id
        if not is_authorized:
            raise REST_Exception(
                message="You are not authorized to delete this user")

        return self.controller.delete_user(user_id=user_id)

    def update_user(self, user_id: str, req_dict: dict, token: str):
        updating_user: User = UserService().get_user_query({"token": token})
        if updating_user is None:
            raise REST_Exception(
                message="Could not find user with the provided token", status=400)

        is_authorized = False
        if updating_user.type_enum == UserType.administrator:
            is_authorized = True
        elif str(updating_user._id) == user_id:
            is_authorized = True
            if "type_enum" in req_dict:
                del req_dict['type_enum']
        else:
            raise REST_Exception(
                message="You are not authorized to update this tool", status=401)
        user: User = self.controller.get_user(user_id=user_id)
        user_dict = self.controller.dump_user(user=user)
        if 'password' in req_dict:
            pass_hashed = hash_password(password=req_dict['password'])
            req_dict['password'] = pass_hashed

        user_dict.update(req_dict)
        if "_id" in user_dict:
            del user_dict['_id']

        user = self.controller.update_user(
            user_id=user_id, user_info=user_dict)
        return self.controller.dump_user(user=user)

    def is_authorized(self, token: str, required_role=UserType.administrator) -> bool:
        user: User = self.controller.get_user_query(query={"token": token})
        if user is None:
            return False

        if user.type_enum == required_role:
            return True
        return False
