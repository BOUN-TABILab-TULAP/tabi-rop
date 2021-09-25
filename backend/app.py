from backend.backend_proxy.api.endpoints import app
import sys
import os

# run from root dir
sys.path.append(".")


def register_admin():
    from backend.backend_proxy.db.mongoDB import MongoDB
    import bcrypt
    password = "DIP_DEMO_ADMIN_PASS"  # TODO: os.environ["DIP_DEMO_ADMIN_PASS"]
    pass_hashed = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
    user = {"username": "admin",
            "password": pass_hashed,
            "roles": ["admin"],
            "tools": [],
            "email": "tabilab.dip@gmail.com"}
    # db = MongoDB(MongoConn("mongodb://mongo:27017/"), "user")
    existing_user = MongoDB.getInstance().find(
        "user", {"username": user["username"]})
    if existing_user is None:
        MongoDB.getInstance().create("user",user)
    else:
        # db.update({"username": user["username"]}, user)
        pass


def debugPrint(*args, **kwargs):
    print(*args, file=sys.stderr, **kwargs)


if __name__ == '__main__':
    register_admin()
    from backend.backend_proxy.containerization.service import DockerService
    DockerService()
    app.run(host='0.0.0.0')
