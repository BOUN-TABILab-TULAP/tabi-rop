from backend.backend_proxy.user.user_type import UserType
from secrets import token_hex


class Feedback:
    def __init__(self, data: dict) -> None:
        self.message = data['message']
        self.registered_at = data['registered_at']
        if '_id' in data:
            self._id = data['_id']
