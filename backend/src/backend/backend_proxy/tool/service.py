from backend.backend_proxy.misc.uiSchema import createUiSchema
from backend.backend_proxy.tool.formats.supportedFormats import SupportedFormats
from backend.backend_proxy.tool.toolClass import Tool
from backend.backend_proxy.containerization.service import DockerService
from backend.backend_proxy.db.mongoDB import MongoDB
from backend.backend_proxy.api.exception import REST_Exception
from backend.backend_proxy.tool.schema import ToolSchema, dtime_format
import backend.backend_proxy.misc.util as util
import backend.backend_proxy.misc.conllXtostandoff as conllXtostandoff
import datetime as dt
import requests
import json
import sys


def debugPrint(*args, **kwargs):
    print(*args, file=sys.stderr, **kwargs)


class ToolService:
    __instance = None

    def __new__(cls, *args, **kwargs):
        if cls.__instance is None:
            cls.__instance = object.__new__(cls, *args, **kwargs)
            cls.__instance._initialized = False
        return cls.__instance

    
    def __init__(self):
        if self._initialized:
            return
        self._initialized = True

        # get tools from db
        tools = MongoDB.getInstance().find_all("tools")
        self.toolObjects = {}

        for tool in tools:
            self.toolObjects[tool['enum']] = Tool(
                enum=tool['enum'],
                ip=tool['ip'],
                port=tool['port'],
                version=tool['version'],
                inputFormats=tool['inputFormats'],
                outputFormats=tool['outputFormats'],
                endpoint=tool['endpoint']
            )
        debugPrint(self.toolObjects)

    def add_tool(self, req_dict):
        if 'enum' not in req_dict:
            raise REST_Exception("You have to provide an enum")
        enum = req_dict["enum"]
        if self.enum_exists(enum):
            raise REST_Exception("The enum: {} already exists, "
                                 "enter a unique one".format(enum))
        toolPath = util.get_specs_from_git(req_dict["git"])
        req_dict['port'] = DockerService().create_new_container(
            toolPath, req_dict['enum'], req_dict['version'])
        req_dict['ip'] = "host.docker.internal"
        req_dict['schema'], req_dict['uiSchema'] = createUiSchema(
            req_dict['inputFormats'])
        MongoDB.getInstance().create("tools", req_dict)
        self.toolObjects[req_dict['enum']] = Tool(
            enum=req_dict['enum'],
            ip=req_dict['ip'],
            port=req_dict['port'],
            version=req_dict['version'],
            inputFormats=req_dict['inputFormats'],
            outputFormats=req_dict['outputFormats'],
            endpoint=req_dict['endpoint']

        )
        return self.dump(req_dict)

    def update_tool(self, req_dict, original_enum):
        #TODO Authentication
        # if 'enum' not in req_dict:
        #     raise REST_Exception("You must specify enum")
        
        enum = original_enum
        if enum not in self.toolObjects:
            raise REST_Exception("Could not find the specified enum")
        tool : Tool = self.toolObjects[enum]
        is_successful = tool.update(req_dict)
        return is_successful

        
        # if (access_tools is not None) and (original_enum not in access_tools):
            # raise REST_Exception("You have no right to update this tool")

        # if self.enum_exists(enum) and (enum != original_enum):
        #     raise REST_Exception("The enum: {} already exists, "
        #                          "enter a unique one".format(enum))
        # # Reloads the git URL again since
        # #   this might be the main motivation of the update
        # (author_json, form_data_json, root_json), toolPath = util.get_specs_from_git(
        #     req_dict["git"])
        # if "author_json" not in req_dict or not req_dict["author_json"]:
        #     req_dict["author_json"] = author_json
        # req_dict["author_json"] = author_json
        # req_dict["root_json"] = root_json
        # req_dict["form_data_json"] = form_data_json
        # req_dict["update_time"] = dt.datetime.now()
        # # copy contact info to separate variable
        # if "contact_info" in req_dict["author_json"]:
        #     req_dict["contact_info"] = req_dict["author_json"]["contact_info"]
        # MongoDB.getInstance().update(
        #     "tools", {"enum": original_enum}, req_dict)
        # return self.dump(req_dict)

    def delete_tool(self, enum, access_tools):
            pass

        # if (access_tools is not None) and (enum not in access_tools):
        #     raise REST_Exception("You have no right to update this tool")

        # tool_dict = MongoDB.getInstance().find("tools", {"enum": enum})
        # if tool_dict is None:
        #     raise REST_Exception("Tool enum does not exist")
        # MongoDB.getInstance().delete("tools", tool_dict)
        # return self.dump(tool_dict)

    def get_tool_ui_info(self, enum):
        tool_dict = MongoDB.getInstance().find("tools", {"enum": enum})
        if tool_dict is None:
            raise REST_Exception(
                "Tool with enum: {} does not exist".format(enum))
        tool_dict = ToolSchema(only=(
            "author_json", "root_json", "form_data_json")).dump(tool_dict)
        return tool_dict

    def run_tool(self, enum, input_dict: dict):
        return self.toolObjects[enum].run(input_dict)

    def list_all_tools(self, access_tools):
        tools = MongoDB.getInstance().find_all("tools",)
        if access_tools is None:
            return [self.dump(tool) for tool in tools]
        else:
            access_tools = set(access_tools)
            return [self.dump(tool) for tool in tools if tool["enum"] in access_tools]

    def get_tool_names(self):
        tools = MongoDB.getInstance().find_all("tools",)
        return [ToolSchema(only=("enum", "name")).dump(tool) for tool in tools]

    def enum_exists(self, enum):
        return (MongoDB.getInstance().find("tools", {"enum": enum}) is not None)

    def dump(self, obj):
        return ToolSchema(exclude=['_id','ip','port','version']).dump(obj)

    def run_request(self, ip, port, input_dict):
        # all running programs must implement /evaluate endpoint
        addr = "http://{}:{}/evaluate".format(ip, port)
        return requests.post(addr, json=input_dict)
