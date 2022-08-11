from backend.backend_proxy.db.mongoDB import MongoDB

class EventController():
    __instance__ = None

    def __new__(cls, *args, **kwargs):
        if cls.__instance__ is None:
            cls.__instance__ = object.__new__(cls, *args, **kwargs)
        return cls.__instance__

    def __init__(self) -> None:
        self.collection = MongoDB.get_collection("event")
    

    def save_event(self, event: dict):
        self.collection.insert_one(event)