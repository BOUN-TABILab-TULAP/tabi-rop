from pymongo import MongoClient
import pymongo

from backend.backend_proxy.config import Config


def get_authentication_for_db() -> str:
    username = Config.MONGO_USERNAME
    password = Config.MONGO_PASSWORD

    return username, password


class MongoDB(object):
    __instance = None
    collections = ['tool','user','event']

    @staticmethod
    def getInstance(address="mongo", port=27017, username=None, password=None):
        """ Static access method. """
        if MongoDB.__instance == None:
            if username is None or password is None:
                username, password = get_authentication_for_db()
            db_url = f"mongodb://{username}:{password}@{address}:{port}/"
            MongoDB.__instance = MongoDB(db_url)
        return MongoDB.__instance

    @staticmethod
    def get_collection(collection_name:str):
        if collection_name not in MongoDB.collections:
            return f"{collection_name} is not supported via this class."
        # Initialize the connection if necessary
        if MongoDB.__instance == None:
            MongoDB.getInstance()
        
        return MongoDB.__instance.db[collection_name]
        

    def __init__(self, mongoUrl="mongodb://mongo:27017/"):
        self.db = MongoClient(mongoUrl).tools

    def find_all(self, collection):
        return self.db[collection].find({})

    def find(self, collection, query):
        return self.db[collection].find_one(query)

    def create(self, collection, tool):
        return self.db[collection].insert_one(tool)

    def update(self, collection, query, tool):
        return self.db[collection].replace_one(query, tool).modified_count

    def delete(self, collection, query):
        return self.db[collection].delete_one(query).deleted_count
