from backend.backend_proxy.misc.uiSchema import createUiSchema
from backend.backend_proxy.tool.formats.supportedFormats import SupportedFormats
from backend.backend_proxy.tool.toolClass import Tool
from backend.backend_proxy.containerization.service import DockerService
from backend.backend_proxy.db.mongoDB import MongoDB
from backend.backend_proxy.db.mongoDB import MongoConn
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

    @staticmethod
    def getInstance():
        """ Static access method. """
        if ToolService.__instance == None:
            ToolService.__instance = ToolService()
        return ToolService.__instance

    def __init__(self):
        cn = MongoConn()
        self.db = MongoDB(cn, "tools")

        # get tools from db
        tools = self.db.find_all()
        self.toolObjects = {}

        for tool in tools:
            self.toolObjects[tool['enum']] = Tool(
                enum=tool['enum'],
                ip=tool['ip'],
                port=tool['port'],
                version=tool['version'],
                inputFormats=tool['inputFormats'],
                outputFormats=tool['outputFormats'],
                endpoint = tool['endpoint']
            )
        debugPrint(self.toolObjects)

    def add_tool(self, req_dict):
        enum = req_dict["enum"]
        if self.enum_exists(enum):
            raise REST_Exception("The enum: {} already exists, "
                                 "enter a unique one".format(enum))
        toolPath = util.get_specs_from_git(req_dict["git"])
        req_dict['port'] = DockerService.getInstance().create_new_container(
            toolPath, req_dict['enum'], req_dict['version'])
        req_dict['ip'] = "172.17.0.1"
        req_dict['schema'],req_dict['uiSchema']= createUiSchema(req_dict['inputFormats'])
        self.db.create(req_dict)
        self.toolObjects[req_dict['enum']] = Tool(
                enum=req_dict['enum'],
                ip=req_dict['ip'],
                port=req_dict['port'],
                version=req_dict['version'],
                inputFormats=req_dict['inputFormats'],
                outputFormats=req_dict['outputFormats'],
                endpoint = req_dict['endpoint']

            )
        return self.dump(req_dict)

        '''
        # Old Version
        enum = req_dict["enum"]
        if self.enum_exists(enum):
            raise REST_Exception("The enum: {} already exists, "
                                 "enter a unique one".format(enum))
        (author_json, form_data_json, root_json), toolPath = util.get_specs_from_git(
            req_dict["git"])
        if "author_json" not in req_dict or not req_dict["author_json"]:
            req_dict["author_json"] = author_json
        else:
            req_dict["author_json"] = json.loads(req_dict["author_json"])
        req_dict["root_json"] = root_json
        req_dict["form_data_json"] = form_data_json
        req_dict["update_time"] = dt.datetime.now()
        # copy contact info to separate variable
        req_dict['version'] = "1.0.0"
        req_dict['port'] = DockerService.getInstance().create_new_container(
            toolPath, req_dict['enum'], req_dict['version'])
        req_dict['ip'] = "172.17.0.1"
        if "contact_info" in req_dict["author_json"]:
            req_dict["contact_info"] = req_dict["author_json"]["contact_info"]
        self.db.create(req_dict)
        return self.dump(req_dict)
        '''

    def update_tool(self, req_dict, original_enum, access_tools):
        if (access_tools is not None) and (original_enum not in access_tools):
            raise REST_Exception("You have no right to update this tool")

        enum = req_dict["enum"]
        if self.enum_exists(enum) and (enum != original_enum):
            raise REST_Exception("The enum: {} already exists, "
                                 "enter a unique one".format(enum))
        # Reloads the git URL again since
        #   this might be the main motivation of the update
        (author_json, form_data_json, root_json), toolPath = util.get_specs_from_git(
            req_dict["git"])
        if "author_json" not in req_dict or not req_dict["author_json"]:
            req_dict["author_json"] = author_json
        req_dict["author_json"] = author_json
        req_dict["root_json"] = root_json
        req_dict["form_data_json"] = form_data_json
        req_dict["update_time"] = dt.datetime.now()
        # copy contact info to separate variable
        if "contact_info" in req_dict["author_json"]:
            req_dict["contact_info"] = req_dict["author_json"]["contact_info"]
        self.db.update({"enum": original_enum}, req_dict)
        return self.dump(req_dict)

    def delete_tool(self, enum, access_tools):
        if (access_tools is not None) and (enum not in access_tools):
            raise REST_Exception("You have no right to update this tool")

        tool_dict = self.db.find({"enum": enum})
        if tool_dict is None:
            raise REST_Exception("Tool enum does not exist")
        self.db.delete(tool_dict)
        return self.dump(tool_dict)

    def get_tool_ui_info(self, enum):
        tool_dict = self.db.find({"enum": enum})
        if tool_dict is None:
            raise REST_Exception(
                "Tool with enum: {} does not exist".format(enum))
        tool_dict = ToolSchema(only=(
            "author_json", "root_json", "form_data_json")).dump(tool_dict)
        return tool_dict

    def run_tool(self, enum, input_dict: dict):
        # tool_dict = self.db.find({"enum": enum})
        # if tool_dict is None:
        #     raise REST_Exception(
        #         "Tool with enum: {} does not exist".format(enum))
        # tool_dict = self.dump(tool_dict)
        # ip, port = tool_dict["ip"], tool_dict["port"]
        # response = self.run_request(ip, port, input_dict).json()
        # if "brat_conll" in response:
        #     standoff = conllXtostandoff.process(response["brat_conll"])
        #     response["brat_standoff"] = standoff
        #     del response["brat_conll"]
        return self.toolObjects[enum].run(input_dict)

    def list_all_tools(self, access_tools):
        tools = self.db.find_all()
        if access_tools is None:
            return [self.dump(tool) for tool in tools]
        else:
            access_tools = set(access_tools)
            return [self.dump(tool) for tool in tools if tool["enum"] in access_tools]

    def get_tool_names(self):
        tools = self.db.find_all()
        return [ToolSchema(only=("enum", "name")).dump(tool) for tool in tools]

    def enum_exists(self, enum):
        return (self.db.find({"enum": enum}) is not None)

    def dump(self, obj):
        return ToolSchema(exclude=['_id']).dump(obj)

    def run_request(self, ip, port, input_dict):
        # all running programs must implement /evaluate endpoint
        addr = "http://{}:{}/evaluate".format(ip, port)
        return requests.post(addr, json=input_dict)
