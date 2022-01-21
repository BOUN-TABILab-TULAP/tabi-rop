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

from backend.backend_proxy.user.user_controller import UserController
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

@app.route("/api/debug", methods=["POST"])
def de():
    u = {
        "password":"asdasda",
    }
    return UserController().update_user("61d1ba6e1d902ceccf404a6b",u)
    # return UserController().create_user(u)
    # return UserController().get_user("61d1ba6e1d902ceccf404a6b")

@app.route("/api/tools", methods=["GET"])
def list_all_tools():
    try:
        access_tools = UserService().get_tools_user(session)
        data = ToolService().list_all_tools(access_tools)
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
        access_tools = None
        data = ToolService().list_all_tools(access_tools)
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
        UserService().assert_logged_in(session)
        req_dict = json.loads(request.data)
        req_dict = ToolService().add_tool(req_dict)
        UserService().add_tool_to_user(session, req_dict["enum"])
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
        # access_tools = UserService().get_tools_user(session)
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


@app.route("/api/tool/ui/<enum>", methods=["GET"])
def get_tool_ui_info(enum):
    try:
        data = ToolService().get_tool_ui_info(enum)
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
        data = DockerService().restart_container(enum,input_dict)
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
    session.clear()
    try:
        req_dict = json.loads(request.data)
        user = UserService().login_user(req_dict)
        # login succeeded gen session
        session["username"] = user["username"]
        data = dict({"title": "Login success", })
        status = 200
    except REST_Exception as e:
        data = dict({"title": "Server Error",
                     "subTitle": "Logs: {}".format(str(e))})
        status = e.status
    return get_response_json(data, status)


@app.route("/api/user/<username>", methods=["DELETE"])
def delete_user(username):
    try:
        UserService().delete_user(username, session)
        data = dict({"title": "User is successfully deleted", })
        status = 200
    except REST_Exception as e:
        data = dict({"title": "Server Error",
                     "subTitle": "Logs: {}".format(str(e))})
        status = e.status
    return get_response_json(data, status)


@app.route("/api/user", methods=["GET"])
def get_user():
    try:
        data = UserService().get_current_user(session)
        status = 200
    except REST_Exception as e:
        data = dict({"title": "Server Error",
                     "subTitle": "Logs: {}".format(str(e))})
        status = e.status
    return get_response_json(data, status)


@app.route("/api/users", methods=["GET"])
def get_users():
    try:
        data = UserService().get_users(session)
        status = 200
    except REST_Exception as e:
        data = dict({"title": "Server Error",
                     "subTitle": "Logs: {}".format(str(e))})
        status = e.status
    return get_response_json(data, status)


@app.route("/api/user/isauth", methods=["GET"])
def isauth_user():
    try:
        UserService().assert_logged_in(session)
        data = dict({"title": "Authenticated", })
        status = 200
    except REST_Exception as e:
        data = dict({"title": "Server Error",
                     "subTitle": "Logs: {}".format(str(e))})
        status = e.status
    return get_response_json(data, status)


@app.route("/api/user/logout", methods=["GET"])
def logout_user():
    session.clear()
    data = dict({"title": "Logged out"})
    status = 200
    return get_response_json(data, status)


@app.route("/api/user/register", methods=["POST"])
def register_user():
    try:
        req_dict = json.loads(request.data)
        user = UserService().register_user(req_dict, session)
        data = dict({"title": "Register success", })
        status = 200
    except REST_Exception as e:
        data = dict({"title": "Server Error",
                     "subTitle": "Logs: {}".format(str(e))})
        status = e.status
    return get_response_json(data, status)


@app.route("/api/user/update_info", methods=["PUT"])
def update_cur_user_info():
    try:
        req_dict = json.loads(request.data)
        user = UserService().update_cur_user_info(req_dict, session)
        data = dict({"title": "Information Update success", })
        status = 200
    except REST_Exception as e:
        data = dict({"title": "Server Error",
                     "subTitle": "Logs: {}".format(str(e))})
        status = e.status
    return get_response_json(data, status)


@app.route("/api/user/update_pass", methods=["PUT"])
def update_cur_user_pass():
    try:
        req_dict = json.loads(request.data)
        user = UserService().update_cur_user_pass(req_dict, session)
        data = dict({"title": "Password Update success", })
        status = 200
    except REST_Exception as e:
        data = dict({"title": "Server Error",
                     "subTitle": "Logs: {}".format(str(e))})
        status = e.status
    return get_response_json(data, status)


@app.route("/api/user/update/<username>", methods=["PUT"])
def update_other_user(username):
    try:
        req_dict = json.loads(request.data)
        user = UserService().update_other_user(username, req_dict, session)
        data = dict({"title": "Update success", })
        status = 200
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
