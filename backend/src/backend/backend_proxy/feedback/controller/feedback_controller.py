import datetime
from backend.backend_proxy.db.mongoDB import MongoDB
from backend.backend_proxy.feedback.controller.abstract_controller import AbstractFeedbackController
from backend.backend_proxy.feedback.feedback_class import Feedback
from backend.backend_proxy.feedback.schema import FeedbackSchema
from bson.objectid import ObjectId


class FeedbackController(AbstractFeedbackController):
    __instance__ = None
    schema: FeedbackSchema = FeedbackSchema()

    def __new__(cls, *args, **kwargs):
        if cls.__instance__ is None:
            cls.__instance__ = object.__new__(cls, *args, **kwargs)
        return cls.__instance__

    def __init__(self) -> None:
        self.collection = MongoDB.get_collection("feedback")
    
    def get_feedback(self, feedback_id: str) -> Feedback:
        feedback_dict = self.collection.find_one({"_id": ObjectId(feedback_id)})
        if feedback_dict is None:
            return None
        return self.schema.create_object(feedback_dict)

    def create_feedback(self, feedback: dict) -> bool:

        feedback['registered_at'] = datetime.datetime.now().strftime(
            '%Y-%m-%dT%H:%M:%S')

        created_feedback = self.schema.create_object(feedback)

        inserted_object = self.collection.insert_one(
            self.schema.dump(created_feedback))
        return self.get_feedback(feedback_id=inserted_object.inserted_id)
   
    def get_all_feedbacks(self) -> list[Feedback]:
        return [self.schema.create_object(x) for x in self.collection.find({})]

    def dump_feedback(
        self, feedback: Feedback) -> dict: return self.schema.dump(feedback=feedback)
