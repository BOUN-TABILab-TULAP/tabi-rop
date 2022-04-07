import bcrypt
from backend.backend_proxy.user.controller.user_controller import UserController


def hash_password(password: str) -> bytes:
    pass_hashed = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
    return pass_hashed


def is_authenticated(user_id: str, given_password: str) -> bool:
    user = UserController().get_user(user_id=user_id)
    if user is None:
        return False
    given_hashed = hash_password(given_password)
    return given_hashed == user.password_hash

