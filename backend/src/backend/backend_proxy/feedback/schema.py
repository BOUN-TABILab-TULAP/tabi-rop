import bson
from datetime import date, datetime
from backend.backend_proxy.feedback.feedback_class import Feedback
from backend.backend_proxy.user.user_class import User
from backend.backend_proxy.user.user_type import UserType


class NotFoundException(Exception):
    def __init__(self, field):
        self.message = f"{field} is not in provided data"
        super().__init__(self.message)


class IncorrectTypeException(Exception):
    def __init__(self, field, expected_type, given_type):
        self.message = f"Expected type for {field} is {expected_type}; however, given type is {given_type}"
        super().__init__(self.message)


class FeedbackSchema():
    fields = {
        "message": str,
        "registered_at": str,

    }

    @staticmethod
    def create_object(data, **kwargs):
        for field, field_type in FeedbackSchema.fields.items():
            if field not in data:
                raise NotFoundException(field=field)
            given_type = type(data[field])
            if field_type != given_type:
                raise IncorrectTypeException(
                    field=field, expected_type=field_type, given_type=given_type)
        return Feedback(data)

    @staticmethod
    def dump(feedback: Feedback) -> dict:
        d = {
            "message": feedback.message,
            "registered_at": feedback.registered_at,
        }
        if hasattr(feedback, "_id"):
            d["_id"] = str(feedback._id)
        return d
