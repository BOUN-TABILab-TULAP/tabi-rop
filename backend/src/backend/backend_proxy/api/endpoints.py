from typing import Container
from backend.backend_proxy.config import Config
from backend.backend_proxy.containerization.service import DockerService
from backend.backend_proxy.feedback.service import FeedbackService
from backend.backend_proxy.logging.event import Event
from backend.backend_proxy.api.exception import IncorrectTypeException, NotFoundException
from flask import Flask, json, g, request, jsonify, json, session
from flask_cors import CORS, cross_origin
from backend.backend_proxy.tool.formats.supportedFormats import SupportedFormats
from backend.backend_proxy.tool.schema import ToolSchema
from backend.backend_proxy.tool.service import ToolService
from backend.backend_proxy.db.mongoDB import MongoDB

from backend.backend_proxy.user.service import UserService
from backend.backend_proxy.api.exception import REST_Exception
from datetime import timedelta
from backend.backend_proxy.db.mongoDB import MongoDB
from backend.backend_proxy.misc.util import *
import traceback
import sys
from datetime import datetime

from backend.backend_proxy.user.controller.user_controller import UserController
from backend.backend_proxy.user.user_type import UserType

app = Flask(__name__)
app.permanent_session_lifetime = timedelta(days=5)
app.secret_key = Config.FLASK_SECRET_KEY
CORS(app, supports_credentials=True)


def debugPrint(*args, **kwargs):
    print(*args, file=sys.stderr, **kwargs)

exceptions = (REST_Exception,NotFoundException,IncorrectTypeException)

@app.route("/api/alive", methods=["GET"])
def alive():
    return create_response(message="Hi", status=200)


@app.route("/api/tools", methods=["GET"])
def list_all_tools():
    try:
        data = ToolService().list_all_tools()
        status = 200
        return create_response(data=data, status=status)
    except exceptions as e:
        # traceback.print_exc()
        return create_response(message=e.message, status=e.status)


@app.route("/api/tools/editable", methods=["GET"])
def list_editable_tools():
    try:
        if "Token" not in dict(request.headers):
            raise REST_Exception(
                "You must provide a token in the header", status=400)
        token = request.headers.get("Token")
        data = ToolService().list_editable_tools(token=token)
        status = 200
        return create_response(data=data, status=status)
    except exceptions as e:
        # traceback.print_exc()
        return create_response(message=e.message, status=e.status)


@app.route("/api/tools/name", methods=["GET"])
def get_tool_names():
    try:
        data = ToolService().list_all_tools()
        status = 200
        return create_response(data=data, status=status)
    except exceptions as e:
        # traceback.print_exc()
        return create_response(message=e.message, status=e.status)


@app.route("/api/tool", methods=["POST"])
def add_tool():
    try:
        if "Token" not in dict(request.headers):
            raise REST_Exception(
                "You must provide a token in the header", status=400)
        token = request.headers.get("Token")
        req_dict = json.loads(request.data)
        req_dict = ToolService().add_tool(req_dict=req_dict, token=token)
        data = {"message": "Tool is added", "tool_info": req_dict}
        status = 200
        return create_response(data=data, status=status)
    except exceptions as e:
        # traceback.print_exc()
        return create_response(message=e.message, status=e.status)


@app.route("/api/tool/formats", methods=["GET"])
def toolFormats():
    data = SupportedFormats.getSupportedTypes()
    return create_response(data=data, status=200)


@app.route("/api/tool/update/<enum>", methods=["POST"])
def update_tool(enum):
    try:
        if "Token" not in dict(request.headers):
            raise REST_Exception(
                "You must provide a token in the header", status=400)
        token = request.headers.get("Token")
        req_dict = json.loads(request.data)
        req_dict = ToolService().update_tool(req_dict=req_dict, enum=enum, token=token)
        data = {"message": "Tool is updated", "tool_info": req_dict}
        status = 200
        return create_response(data=data, status=status)
    except exceptions as e:
        return create_response(message=e.message, status=e.status)


@app.route("/api/tool/delete/<enum>", methods=["GET"])
def delete_tool(enum):
    try:
        if "Token" not in dict(request.headers):
            raise REST_Exception(
                "You must provide a token in the header", status=400)
        token = request.headers.get("Token")
        ToolService().delete_tool(enum=enum, token=token)
        data = {"message": "Tool is deleted", }
        status = 200
        return create_response(data=data, status=status)
    except exceptions as e:
        return create_response(message=e.message, status=e.status)


@app.route("/api/tool/run/<enum>", methods=["POST"])
def run_tool(enum):
    is_test = request.args.get("test", default=None, type=str)
    event = Event(enum)
    res = None
    try:
        # input for the tool
        event.input = request.data
        input_dict = json.loads(request.data)
        data = ToolService().run_tool(enum, input_dict)
        event.output = data
        event.isSuccessful = True
        status = 200
        res = create_response(data=data, status=status)
    except exceptions as e:
        # traceback.print_exc()
        event.isSuccessful = False
        status = e.status
        message = e.message
        res = create_response(message=message, status=status)
    event.finish_event(status)
    if not is_test:
        event.save() # save event to db
        debugPrint(event) # log event for grafana visualization
    return res


@app.route("/api/tool/restart/<enum>", methods=["POST"])
def restart_tool(enum):
    try:
        # input for the tool
        input_dict = None
        token = None
        if request.data != None and request.data != b'':
            input_dict = json.loads(request.data)
        if "Token" in dict(request.headers):
            token = request.headers.get("Token")
        data = DockerService().restart_container(
            enum, input_dict=input_dict, token=token)
        if (data):
            ToolService().toolObjects[enum].port = data
            data = {"message": f"Restarted {enum}"}
            status = 200
            return create_response(data=data, status=status)
        return create_response(message=f"Could not restart {enum}", status=400)
    except exceptions as e:
        # traceback.print_exc()
        return create_response(message=e.message, status=e.status)

# =============================================================


@app.route("/api/user/login", methods=["POST"])
def login_user():
    try:
        req_dict = json.loads(request.data)
        data = UserService().login_user(req_dict)
        status = 200
        return create_response(data=data, status=status)
    except exceptions as e:
        # traceback.print_exc()
        return create_response(message=e.message, status=e.status)


@app.route("/api/users", methods=["GET"])
def get_users():
    try:
        if "Token" not in dict(request.headers):
            raise REST_Exception(
                "You must provide a token in the header", status=400)
        token = request.headers.get("Token")

        data = UserService().get_users(token=token)
        status = 200
        return create_response(data=data, status=status)
    except exceptions as e:
        # traceback.print_exc()
        return create_response(message=e.message, status=e.status)


@app.route("/api/user/register", methods=["POST"])
def register_user():
    try:
        if "Token" not in dict(request.headers):
            raise REST_Exception(
                "You must provide a token in the header", status=400)
        token = request.headers.get("Token")
        req_dict = json.loads(request.data)
        is_successful = UserService().create_user(req_dict, token=token)
        if is_successful:
            data = {"message": "Registered Successfully"}
            return create_response(data=data, status=200)
        else:
            data = {"message": "Could not register"}
            return create_response(data=data, status=400)
    except exceptions as e:
        # traceback.print_exc()
        return create_response(message=e.message, status=e.status)


@app.route("/api/user/delete/<user_id>", methods=["GET"])
def delete_user(user_id):
    try:
        if "Token" not in dict(request.headers):
            raise REST_Exception(
                "You must provide a token in the header", status=400)
        token = request.headers.get("Token")
        is_successful = UserService().delete_user(user_id=user_id, token=token)
        if is_successful:
            data = {"message": "Deleted Successfully"}
            return create_response(data=data, status=200)
        else:
            data = {"message": "Could not delete"}
            return create_response(data=data, status=400)
    except exceptions as e:
        # traceback.print_exc()
        return create_response(message=e.message, status=e.status)


@app.route("/api/user/update/<user_id>", methods=["POST"])
def edit_user(user_id):
    try:
        if "Token" not in dict(request.headers):
            raise REST_Exception(
                "You must provide a token in the header", status=400)
        token = request.headers.get("Token")
        req_dict = json.loads(request.data)

        user_dict = UserService().update_user(
            user_id=user_id, req_dict=req_dict, token=token)

        data = {"message": "Updated Successfully", "user_info": user_dict}
        return create_response(data=data, status=200)
    except exceptions as e:
        # traceback.print_exc()
        return create_response(message=e.message, status=e.status)

# =============================================================


@app.route("/api/feedback", methods=["POST"])
def create_feedback():
    try:
        req_dict = json.loads(request.data)
        is_successful = FeedbackService().create_feedback(req_dict=req_dict)
        if is_successful:
            data = {"message": " Feedback saved successfully"}
            return create_response(data=data, status=200)
        else:
            data = {"message": "Could not save the feedback"}
            return create_response(data=data, status=400)
    except exceptions as e:
        return create_response(message=e.message, status=e.status)


@app.route("/api/feedbacks", methods=["GET"])
def get_feedbacks():
    try:
        if "Token" not in dict(request.headers):
            raise REST_Exception(
                "You must provide a token in the header", status=400)
        token = request.headers.get("Token")

        data = FeedbackService().get_feedbacks(token=token)
        status = 200
        return create_response(data=data, status=status)
    except exceptions as e:
        # traceback.print_exc()
        return create_response(message=e.message, status=e.status)


def create_response(data: dict = {}, message: str = None, status: int = 400) -> tuple[dict, int]:
    res = {}
    if status != 200:
        res['message'] = message
    else:
        res = data
    return (json.dumps(res), status)


if __name__ == '__main__':
    app.run(port=5000)
