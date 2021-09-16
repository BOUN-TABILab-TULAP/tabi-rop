from pymongo import MongoClient

mongo_url = "mongodb://mongo:27017/"


class MongoConn:
    def __init__(self):
        # TODO: use local db for now
        # db name is "tools"
        # self.db = MongoClient(host="192.168.1.2", port=27017).tools
        self.db = MongoClient(mongo_url).tools


class MongoDB(object):
    def __init__(self, conn, col):
        self.db = conn.db
        self.col = col

    def find_all(self):
        return self.db[self.col].find({})

    def find(self, query):
        return self.db[self.col].find_one(query)

    def create(self, tool):
        return self.db[self.col].insert_one(tool)

    def update(self, query, tool):
        return self.db[self.col].replace_one(query, tool).modified_count

    def delete(self, query):
        return self.db[self.col].delete_one(query).deleted_count
