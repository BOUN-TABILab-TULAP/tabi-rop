import datetime
import secrets
from time import time
from marshmallow import schema
from backend.backend_proxy.db.mongoDB import MongoDB
from backend.backend_proxy.user.controller.abstract_controller import AbstractUserController
from backend.backend_proxy.user.schema import UserSchema
from bson.objectid import ObjectId
from backend.backend_proxy.user.user_class import User

from backend.backend_proxy.user.user_type import UserType


class UserController(AbstractUserController):
    __instance__ = None
    schema: UserSchema = UserSchema()

    def __new__(cls, *args, **kwargs):
        if cls.__instance__ is None:
            cls.__instance__ = object.__new__(cls, *args, **kwargs)
        return cls.__instance__

    def __init__(self) -> None:
        self.collection = MongoDB.get_collection("user")

    def get_user(self, user_id: str) -> User:
        user_dict = self.collection.find_one({"_id": ObjectId(user_id)})
        if user_dict is None:
            return None
        return self.schema.create_object(user_dict)

    def get_user_query(self, query: dict) -> User:
        user_dict = self.collection.find_one(query)
        if user_dict is None:
            return None
        return self.schema.create_object(user_dict)

    def create_user(self, user_info: dict) -> bool:
        if 'type_enum' in user_info and type(user_info['type_enum']) is UserType:
            user_info['type_enum'] = UserType.enumToStr(user_info['type_enum'])

        user_info['last_seen_at'] = datetime.datetime.now().strftime('%Y-%m-%dT%H:%M:%S')
        user_info['registered_at'] = datetime.datetime.now().strftime('%Y-%m-%dT%H:%M:%S')
        user_info['token'] = secrets.token_hex(16)

        created_user = self.schema.create_object(user_info)

        inserted_object = self.collection.insert_one(
            self.schema.dump(created_user,include_credentials=True))
        return self.get_user(user_id=inserted_object.inserted_id)

    def update_user(self, user_id: str, user_info: dict) -> User:
        if 'type_enum' in user_info and type(user_info['type_enum']) is UserType:
            user_info['type_enum'] = UserType.enumToStr(user_info['type_enum'])
        del user_info['_id'] # Cannot update _id
        self.collection.update_one(
            {"_id": ObjectId(user_id)}, {"$set": user_info})
        return UserController().get_user(user_id=user_id)

    def get_all_users(self) -> list[User]:
        return [self.schema.create_object(x) for x in self.collection.find({})]
