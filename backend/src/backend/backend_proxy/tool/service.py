from json import tool
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


def debugPrint(*args, **kwargs):
    print(*args, file=sys.stderr, **kwargs)


class ToolService:
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
            self.controller = ToolController()
        else:
            self.controller: AbstractToolController = controller
        tools = self.controller.get_all_tools()
        self.toolObjects: dict[str, Tool] = {tool.enum: tool for tool in tools}

    def add_tool(self, req_dict: dict, token: str):

        adding_user: User = UserService().get_user_query(
            query={"token": token})
        if adding_user is None:
            raise REST_Exception(
                "Could not find an user with the provided token")

        req_dict['added_by'] = adding_user.username

        if 'enum' not in req_dict:
            raise REST_Exception("You have to provide an enum")

        enum = req_dict["enum"]

        if self.controller.get_tool_query(query={"enum": enum}) != None:
            raise REST_Exception(
                f"The enum: {enum} already exists, please provide another enum")

        if 'general_info' not in req_dict or len(req_dict['general_info'].keys()) < 1:
            raise REST_Exception(
                f"You must provide general_info field")
        
        if 'name' not in req_dict:
            lang = list(req_dict['general_info'].keys())[0]
            if 'name' not in req_dict['general_info'][lang]:
                raise REST_Exception(
                f"You must provide name field in  general_info for {lang}")
            req_dict['name'] = req_dict['general_info'][lang]['name']

        # Clone given repository
        toolPath = util.get_specs_from_git(req_dict["git_address"])
        # Build docker image, run and return port
        req_dict['port'] = DockerService().create_new_container(
            toolPath, req_dict['enum'])

        # My main development machine is windows and I am using WSL(Windows Subsystem for Linux) for running docker.
        # In linux, default IP of docker host is 172.17.0.1; however, that ip constantly changes in WSL so you can reach to docker host by `host.docker.internal` domain.
        # As of Feb 10 2022, Docker in linux does not solve that domain without extra configurations.
        # So, I have to make the following check to assign req_dict['ip'].
        is_running_in_wsl = 'microsoft-standard' in uname().release

        if is_running_in_wsl:
            req_dict['ip'] = "host.docker.internal"
        else:
            req_dict['ip'] = "172.17.0.1"
        tool: Tool = self.controller.create_tool(tool_info=req_dict)
        self.toolObjects[enum] = tool

        return self.controller.dump_tool(tool=tool)

    def update_tool(self, enum: str, req_dict: dict, token: str):
        user: User = UserService().get_user_query({"token": token})
        if user is None:
            raise REST_Exception(
                message="Could not find user with the provided token", status=400)

        tool: Tool = ToolService().get_tool_query({"enum": enum})
        if tool is None:
            raise REST_Exception(
                message="Could not find tool with the provided enum", status=400)
        # check authorization
        is_authorized = False
        if user.type_enum == UserType.administrator:
            is_authorized = True
        elif tool.added_by == user.username:
            is_authorized = True
        else:
            raise REST_Exception(
                message="You are not authorized to update this tool", status=401)

        tool_dict: dict = self.controller.dump_tool(tool=tool)
        tool_dict.update(req_dict)
        if "_id" in tool_dict:
            del tool_dict['_id']  # id cannot be updated
        tool = self.controller.update_tool(tool._id, tool_info=tool_dict)
        self.toolObjects[enum] = tool
        return self.controller.dump_tool(tool=tool)

    def delete_tool(self, enum: str, token: str):
        user: User = UserService().get_user_query({"token": token})
        if user is None:
            raise REST_Exception(
                message="Could not find user with the provided token", status=400)

        tool: Tool = ToolService().get_tool_query({"enum": enum})
        if tool is None:
            raise REST_Exception(
                message="Could not find tool with the provided enum", status=400)
        # check authorization
        is_authorized = False
        if user.type_enum == UserType.administrator:
            is_authorized = True
        elif tool.added_by == user.username:
            is_authorized = True
        else:
            raise REST_Exception(
                message="You are not authorized to update this tool", status=401)
        DockerService().remove_container(container_name=f"{enum}-container")
        return self.controller.delete_tool(tool_id=tool._id)

    def run_tool(self, enum: str, input_dict: dict):
        if enum not in self.toolObjects:
            raise REST_Exception(
                f"The enum: {enum} could not be found in active tools.")
        selected_tool: Tool = self.toolObjects[enum]
        return selected_tool.run(input_dict)

    def list_all_tools(self) -> list[Tool]:
        return [self.controller.dump_tool(tool=tool) for tool in self.controller.get_all_tools()]

    def get_tool_names(self) -> dict[str, str]:
        return [{"name": tool.name, "enum": tool.enum} for tool in self.list_all_tools()]

    def get_tool_query(self, query: dict) -> Tool:
        return self.controller.get_tool_query(query=query)

    def list_editable_tools(self, token: str) -> list[Tool]:
        user: User = UserService().get_user_query({"token": token})
        if user is None:
            raise REST_Exception(message="Could not find user", status=400)
        tools: list[Tool] = self.controller.get_all_tools()
        editable_tools = []
        if user.type_enum == UserType.administrator:
            editable_tools = tools
        else:
            for tool in tools:
                if tool.added_by == user.username:
                    editable_tools.append(tool)
        return [self.controller.dump_tool(tool=tool) for tool in editable_tools]
