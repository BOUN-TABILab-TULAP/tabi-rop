from backend.backend_proxy.api.exception import IncorrectTypeException, NotFoundException
import bson
from datetime import date, datetime
from backend.backend_proxy.feedback.feedback_class import Feedback
from backend.backend_proxy.user.user_class import User
from backend.backend_proxy.user.user_type import UserType


class FeedbackSchema():
    fields = {
        "message": str,
        "type": str,
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
            "type": feedback.type,
            "registered_at": feedback.registered_at,
        }
        if hasattr(feedback, "_id"):
            d["_id"] = str(feedback._id)
        return d
