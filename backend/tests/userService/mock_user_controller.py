from datetime import datetime
import pytest
from backend.backend_proxy.api.exception import REST_Exception
from backend.backend_proxy.user.authentication import hash_password

from backend.backend_proxy.user.controller.abstract_controller import AbstractUserController
from backend.backend_proxy.user.service import UserService
from backend.backend_proxy.user.user_class import User

mock_users = [
    User({"username": "user1", "email": "email1", "_id": "u1",
          "registered_at": datetime.now().strftime('%Y-%m-%dT%H:%M:%S'),
          "last_seen_at": datetime.now().strftime('%Y-%m-%dT%H:%M:%S'),
          "type_enum": "standart",
          "password": hash_password(password="password1"),
          "token": "token1"
          }),
    User({"username": "user2", "email": "email2", "_id": "u2",
          "registered_at": datetime.now().strftime('%Y-%m-%dT%H:%M:%S'),
          "last_seen_at": datetime.now().strftime('%Y-%m-%dT%H:%M:%S'),
          "type_enum": "standart",
          "password": hash_password(password="password2"),
          "token": "token2"
          }),
    User({"username": "user3", "email": "email3", "_id": "u3",
          "registered_at": datetime.now().strftime('%Y-%m-%dT%H:%M:%S'),
          "last_seen_at": datetime.now().strftime('%Y-%m-%dT%H:%M:%S'),
          "type_enum": "administrator",
          "password": hash_password(password="password3"),
          "token": "token3"
          }),
]


class MockUserController(AbstractUserController):
    def __init__(self) -> None:
        self.users = mock_users

    def get_user(self, user_id: str) -> User:
        for user in self.users:
            if user._id == user_id:
                return user
        return None

    def get_user_query(self, query: dict) -> User:
        for user in self.users:
            if "token" in query and user.token != query['token']:
                continue
            if "_id" in query and user._id != query['_id']:
                continue
            if "username" in query and user.username != query['username']:
                continue
            return user
        return None

    def create_user(self, user_info: dict) -> bool:
        try:
            user_info['last_seen_at'] = datetime.now().strftime(
                '%Y-%m-%dT%H:%M:%S'),
            user_info['registered_at'] = datetime.now().strftime(
                '%Y-%m-%dT%H:%M:%S'),
            user_info['token'] = "123"

            self.users.append(User(user_dict=user_info))
            return True
        except Exception as e:
            return False

    def update_user(self, user_id: str, user_info: dict) -> User:
        pass

    def get_all_users(self) -> list[User]:
        return self.users
