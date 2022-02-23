from json import tool
import re
from backend.backend_proxy.feedback.controller.abstract_controller import AbstractFeedbackController
from backend.backend_proxy.feedback.controller.feedback_controller import FeedbackController
from backend.backend_proxy.feedback.schema import FeedbackSchema
from backend.backend_proxy.tool.controller.abstract_controller import AbstractToolController
from backend.backend_proxy.tool.controller.tool_controller import ToolController
from backend.backend_proxy.tool.formats.supportedFormats import SupportedFormats
from backend.backend_proxy.tool.tool_class import Tool
from backend.backend_proxy.containerization.service import DockerService
from backend.backend_proxy.db.mongoDB import MongoDB
from backend.backend_proxy.api.exception import REST_Exception
from backend.backend_proxy.tool.schema import ToolSchema, dtime_format
import backend.backend_proxy.misc.util as util
import backend.backend_proxy.misc.conllXtostandoff as conllXtostandoff
import datetime as dt
from backend.backend_proxy.user.service import UserService
from backend.backend_proxy.user.user_class import User
from backend.backend_proxy.user.user_type import UserType
import requests
import json
import sys
from platform import uname


class FeedbackService:
    __instance = None

    def __new__(cls, *args, **kwargs):
        if cls.__instance is None:
            cls.__instance = object.__new__(cls)
            cls.__instance._initialized = False
        return cls.__instance

    def __init__(self, controller=None) -> None:
        if self._initialized:
            return
        self._initialized = True
        if controller is None:
            self.controller = FeedbackController()
        else:
            self.controller: AbstractFeedbackController = controller

    def create_feedback(self, req_dict: dict):

        if "message" not in req_dict:
            raise REST_Exception(
                message="You need to provide a message", status=400)

        is_successful = self.controller.create_feedback(feedback=req_dict)
        return is_successful

    def get_feedbacks(self, token: str):
        is_authorized = UserService().is_authorized(token=token)
        if not is_authorized:
            raise REST_Exception(
                "You don't have the right to get feedbacks", status=401)
        feedbacks = self.controller.get_all_feedbacks()
        return [FeedbackSchema.dump(feedback=feedback) for feedback in feedbacks]
