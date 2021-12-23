from pymongo import MongoClient



class MongoDB(object):
    __instance = None

    @staticmethod
    def getInstance(mongoUrl="mongodb://mongo:27017/"):
        """ Static access method. """
        if MongoDB.__instance == None:
            MongoDB.__instance = MongoDB(mongoUrl)
        return MongoDB.__instance

    def __init__(self, mongoUrl="mongodb://mongo:27017/"):
        self.db = MongoClient(mongoUrl).tools

    def find_all(self,collection):
        return self.db[collection].find({})

    def find(self, collection, query):
        return self.db[collection].find_one(query)

    def create(self, collection, tool):
        return self.db[collection].insert_one(tool)

    def update(self, collection, query, tool):
        return self.db[collection].replace_one(query, tool).modified_count

    def delete(self, collection, query):
        return self.db[collection].delete_one(query).deleted_count
