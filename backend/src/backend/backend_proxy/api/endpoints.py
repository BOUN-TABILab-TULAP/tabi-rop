from typing import Container
from backend.backend_proxy.config import Config
from backend.backend_proxy.containerization.service import DockerService
from backend.backend_proxy.logging.event import Event
from flask import Flask, json, g, request, jsonify, json, session
from flask_cors import CORS, cross_origin
from backend.backend_proxy.tool.formats.supportedFormats import SupportedFormats
from backend.backend_proxy.tool.schema import ToolSchema
from backend.backend_proxy.tool.service import ToolService
from backend.backend_proxy.user.service import UserService
from backend.backend_proxy.api.exception import REST_Exception
from backend.backend_proxy.db.mongoDB import MongoDB
from datetime import timedelta
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


@app.route("/api/alive", methods=["GET"])
def alive():
    return get_response_json("Hi", 200)


@app.route("/api/tools", methods=["GET"])
def list_all_tools():
    try:
        data = ToolService().list_all_tools()
        status = 200
    except REST_Exception as e:
        traceback.print_exc()
        data = dict({"title": "Server Error",
                     "subTitle": "Logs: {}".format(str(e))})
        status = e.status
    return get_response_json(data, status)


@app.route("/api/tools/name", methods=["GET"])
def get_tool_names():
    try:
        data = ToolService().list_all_tools()
        status = 200
    except REST_Exception as e:
        traceback.print_exc()
        data = dict({"title": "Server Error",
                     "subTitle": "Logs: {}".format(str(e))})
        status = e.status
    return get_response_json(data, status)


@app.route("/api/tool", methods=["POST"])
def add_tool():
    try:
        if "Token" not in dict(request.headers):
            raise REST_Exception(
                "You must provide a token in the header", status=400)
        token = request.headers.get("Token")
        req_dict = json.loads(request.data)
        req_dict = ToolService().add_tool(req_dict=req_dict, token=token)
        data = dict({"title": "Tool is added to the proxy",
                     "subTitle": "Tool Info: {}".format(json.dumps(req_dict))})
        status = 200
    except REST_Exception as e:
        traceback.print_exc()
        data = dict({"title": "Server Error",
                     "subTitle": "Logs: {}".format(str(e))})
        status = e.status
    return get_response_json(data, status)


@app.route("/api/tool/formats", methods=["GET"])
def toolFormats():
    data = SupportedFormats.getSupportedTypes()
    return get_response_json(data, 200)


@app.route("/api/tool/<enum>", methods=["PUT"])
def update_tool(enum):
    try:
        req_dict = json.loads(request.data)
        req_dict = ToolService().update_tool(req_dict, enum, None)
        data = dict({"title": "Tool is updated",
                     "subTitle": "Tool Info: {}".format(json.dumps(req_dict))})
        status = 200
    except REST_Exception as e:
        data = dict({"title": "Server Error",
                     "subTitle": "Logs: {}".format(str(e))})
        status = e.status
    return get_response_json(data, status)


@app.route("/api/tool/<enum>", methods=["DELETE"])
def delete_tool(enum):
    try:
        access_tools = UserService().get_tools_user(session)
        UserService().delete_tool(access_tools, enum)
        tool_json = ToolService().delete_tool(enum, access_tools)
        data = dict({"title": "Tool is deleted",
                     "subTitle": "Tool Info: {}".format(json.dumps(tool_json))})
        status = 200
    except REST_Exception as e:
        data = dict({"title": "Server Error",
                     "subTitle": "Logs: {}".format(str(e))})
        status = e.status
    return get_response_json(data, status)


@app.route("/api/tool/run/<enum>", methods=["POST"])
def run_tool(enum):
    event = Event(enum)
    try:
        # input for the tool
        input_dict = json.loads(request.data)
        data = ToolService().run_tool(enum, input_dict)
        status = 200
    except REST_Exception as e:
        traceback.print_exc()
        data = dict({"title": "Server Error",
                     "subTitle": "Logs: {}".format(str(e))})
        status = e.status
    event.finish_event(status)
    debugPrint(event)
    return get_response_json(data, status)


@app.route("/api/tool/restart/<enum>", methods=["POST"])
def restart_tool(enum):
    try:
        # input for the tool
        input_dict = json.loads(request.data)
        data = DockerService().restart_container(enum, input_dict)
        if (data):
            ToolService().toolObjects[enum].port = data
            data = True
        status = 200
    except REST_Exception as e:
        traceback.print_exc()
        data = dict({"title": "Server Error",
                     "subTitle": "Logs: {}".format(str(e))})
        status = e.status
    return get_response_json(data, status)

# =============================================================


@app.route("/api/user/login", methods=["POST"])
def login_user():
    try:
        req_dict = json.loads(request.data)
        data = UserService().login_user(req_dict)
        status = 200
    except REST_Exception as e:
        data = dict({"title": "Server Error",
                     "subTitle": f"Logs: {str(e)}"})
        status = e.status
    return get_response_json(data, status)


@app.route("/api/users", methods=["GET"])
def get_users():
    if "Token" not in dict(request.headers):
        raise REST_Exception(
            "You must provide a token in the header", status=400)
    token = request.headers.get("Token")

    try:
        data = UserService().get_users(token=token)
        status = 200
    except REST_Exception as e:
        data = dict({"title": "Server Error",
                     "subTitle": "Logs: {}".format(str(e))})
        status = e.status
    return get_response_json(data, status)


@app.route("/api/user/register", methods=["POST"])
def register_user():
    try:
        req_dict = json.loads(request.data)
        is_successful = UserService().create_user(req_dict)
        if is_successful:
            data = dict({"title": "Register success", })
            status = 200
        else:
            data = dict({"title": "Could not register", })
            status = 400

    except REST_Exception as e:
        data = dict({"title": "Server Error",
                     "subTitle": "Logs: {}".format(str(e))})
        status = e.status
    return get_response_json(data, status)


def get_response_json(data, status):
    response = (json.dumps(data), status)
    return response


if __name__ == '__main__':
    app.run(port=5000)
