from backend.backend_proxy.api.exception import IncorrectTypeException, NotFoundException
import bson
from datetime import date, datetime
from backend.backend_proxy.user.user_class import User
from backend.backend_proxy.user.user_type import UserType


# class NotFoundException(Exception):
#     def __init__(self, field):
#         self.message = f"{field} is not in provided data"
#         super().__init__(self.message)


# class IncorrectTypeException(Exception):
#     def __init__(self, field, expected_type, given_type):
#         self.message = f"Expected type for {field} is {expected_type}; however, given type is {given_type}"
#         super().__init__(self.message)


class UserSchema():
    fields = {
        "username": str,
        "email": str,
        "password": bytes,
        "registered_at": str,
        "last_seen_at": str,
        "type_enum": str,
        "token": str,
    }

    @staticmethod
    def create_object(data, **kwargs):
        for field, field_type in UserSchema.fields.items():
            if field not in data:
                raise NotFoundException(field=field)
            given_type = type(data[field])
            if field_type != given_type:
                raise IncorrectTypeException(
                    field=field, expected_type=field_type, given_type=given_type)
        return User(data)

    @staticmethod
    def dump(user: User, include_credentials: bool = False) -> dict:
        d = {
            "username": user.username,
            "email": user.email,
            "registered_at": user.registered_at,
            "last_seen_at": user.last_seen_at,
            "type_enum": UserType.enumToStr(user.type_enum),
        }
        if include_credentials:
            d['password'] = user.password
            d['token'] = user.token
        if hasattr(user, "_id"):
            d["_id"] = str(user._id)
        return d
