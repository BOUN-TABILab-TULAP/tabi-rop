from backend.backend_proxy.api.endpoints import app
import sys
import os

from backend.backend_proxy.config import Config

# run from root dir
sys.path.append(".")


def register_admin():
    from backend.backend_proxy.db.mongoDB import MongoDB
    import bcrypt
    password = Config.ADMINISTRATOR_PASSWORD  
    pass_hashed = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
    user = {"username": "admin",
            "password": pass_hashed,
            "roles": ["admin"],
            "tools": [],
            "email": "tabilab.dip@gmail.com"}
    existing_user = MongoDB.getInstance().find(
        "user", {"username": user["username"]})
    if existing_user is None:
        MongoDB.getInstance().create("user",user)
    else:
        db.update({"username": user["username"]}, user)



if __name__ == '__main__':
    register_admin()
    from backend.backend_proxy.containerization.service import DockerService
    DockerService()
    app.run(host='0.0.0.0')
