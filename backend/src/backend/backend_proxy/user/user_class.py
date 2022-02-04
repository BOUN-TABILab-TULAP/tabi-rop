from backend.backend_proxy.user.user_type import UserType
from secrets import token_hex

class User:
    def __init__(self, user_dict: dict) -> None:
        self.username = user_dict['username']
        self.email = user_dict['email']
        self.registered_at = user_dict['registered_at']
        self.last_seen_at = user_dict['last_seen_at']
        self.type_enum = UserType.strToEnum((user_dict['type_enum']))
        if '_id' in user_dict: self._id = user_dict['_id']
        self.password = user_dict['password']
        self.token = user_dict['token']

    def update_token(self) -> str:
        from backend.backend_proxy.user.controller.user_controller import UserController
        self.token = token_hex(16)
        UserController().update_user(user_id=self._id,user_info={"token":self.token})
        return self.token