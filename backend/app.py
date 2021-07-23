import sys
import os

# run from root dir
sys.path.append(".")


def register_admin():
    from backend_proxy.db.mongoDB import MongoConn, MongoDB
    import bcrypt
    password = "DIP_DEMO_ADMIN_PASS"  # TODO: os.environ["DIP_DEMO_ADMIN_PASS"]
    pass_hashed = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
    user = {"username": "admin",
            "password": pass_hashed,
            "roles": ["admin"],
            "tools": [],
            "email": "tabilab.dip@gmail.com"}
    db = MongoDB(MongoConn(), "user")
    existing_user = db.find({"username": user["username"]})
    if existing_user is None:
        db.create(user)
    else:
        db.update({"username": user["username"]}, user)


#if __name__ == '__main__':
from backend_proxy.api.endpoints import *
register_admin()
app.run(host='0.0.0.0')
