from abc import ABC, abstractmethod

from backend.backend_proxy.user.user_class import User


class AbstractUserController(ABC):

    @abstractmethod
    def __init__(self) -> None: pass

    @abstractmethod
    def get_user(self, user_id: str) -> User: pass

    @abstractmethod
    def get_user_query(self, query: dict) -> User: pass

    @abstractmethod
    def create_user(self, user_info: dict) -> bool: pass

    @abstractmethod
    def update_user(self, user_id: str, user_info: dict) -> User: pass

    @abstractmethod
    def get_all_users(self) -> list[User]: pass

    @abstractmethod
    def dump_user(self, user:User) -> dict: pass