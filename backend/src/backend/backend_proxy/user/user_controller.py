from marshmallow import schema
from backend.backend_proxy.db.mongoDB import MongoDB
from backend.backend_proxy.user.schema import UserSchema
from bson.objectid import ObjectId
from backend.backend_proxy.user.user_class import User

from backend.backend_proxy.user.user_type import UserType


class UserController():
    __instance = None

    def __new__(cls, *args, **kwargs):
        if cls.__instance is None:
            cls.__instance = object.__new__(cls, *args, **kwargs)
        return cls.__instance

    def __init__(self) -> None:
        self.collection = MongoDB.get_collection("user")

    def get_user(self, user_id: str)->User:
        loaded_dict = self.collection.find_one({"_id": ObjectId(user_id)})
        schema = UserSchema()
        user_object = schema.load(loaded_dict)
        return user_object

    def create_user(self, user_info: dict) -> bool:
        schema = UserSchema()
        if 'type_enum' in user_info and type(user_info['type_enum']) is UserType:
            user_info['type_enum'] = UserType.enumToStr(user_info['type_enum'])

        validated_dict = schema.load(user_info)

        inserted_object = self.collection.insert_one(
            schema.dump(validated_dict))
        return self.get_user(user_id=inserted_object.inserted_id)

    def update_user(self, user_id: str, user_info: dict):
        if 'type_enum' in user_info and type(user_info['type_enum']) is UserType:
            user_info['type_enum'] = UserType.enumToStr(user_info['type_enum'])

        self.collection.update_one(
            {"_id": ObjectId(user_id)}, {"$set": user_info})
        return self.get_user(user_id=user_id)

