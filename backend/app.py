from backend.backend_proxy.api.endpoints import app
import sys
import os

from backend.backend_proxy.config import Config
from backend.backend_proxy.user.authentication import hash_password
from backend.backend_proxy.user.controller.user_controller import UserController

# run from root dir
sys.path.append(".")


def register_admin():
    from backend.backend_proxy.db.mongoDB import MongoDB
    password = Config.ADMINISTRATOR_PASSWORD
    pass_hashed = hash_password(password=password)
    user = {"username": "admin",
            "password": pass_hashed,
            "type_enum": "administrator",
            "email": "tabilab.dip@gmail.com"}
            
    existing_user = MongoDB.getInstance().find(
        "user", {"username": user["username"]})
    if existing_user is None:
        UserController().create_user(user_info=user)
    else:
        pass


def debugPrint(*args, **kwargs):
    print(*args, file=sys.stderr, **kwargs)


if __name__ == '__main__':
    register_admin()
    from backend.backend_proxy.containerization.service import DockerService
    DockerService() # Initialize 
    app.run(host='0.0.0.0')
