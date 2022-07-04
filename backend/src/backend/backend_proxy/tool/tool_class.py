import sys
from backend.backend_proxy.tool.abstract_tool_class import AbstractToolClass
from backend.backend_proxy.tool.formats.formatAbstractClass import Format
import requests
from backend.backend_proxy.api.exception import REST_Exception
from backend.backend_proxy.tool.formats.supportedFormats import SupportedFormats
from backend.backend_proxy.db.mongoDB import MongoDB


def debugPrint(*args, **kwargs):
    print(*args, file=sys.stderr, **kwargs)


class Tool(AbstractToolClass):
    def __init__(self, tool_dict: dict) -> None:
        self.name = tool_dict["name"]
        self.enum = tool_dict["enum"]
        self.added_by = tool_dict["added_by"]
        self.registered_at = tool_dict["registered_at"]
        self.ip = tool_dict["ip"]
        self.port = tool_dict["port"]
        self.endpoint = tool_dict["endpoint"]
        self.contact_mail = tool_dict["contact_mail"]
        self.input_fields = tool_dict["input_fields"]
        self.output_fields = tool_dict["output_fields"]
        self.general_info = tool_dict["general_info"]
        self.git_address = tool_dict["git_address"]
        self.tulap_address = tool_dict["tulap_address"]
        if '_id' in tool_dict: self._id = tool_dict['_id']

    def run(self, parameters: dict) -> dict:
        inputs = {}
        for field, val in self.input_fields.items():
            if field not in parameters:
                raise REST_Exception(
                    message=f"You did not provide a required field: {field}", status=400)
            given_input = parameters[field]

            format_of_field: str = val['type']
            format_object: Format = SupportedFormats.get_format_from_string(
                format_of_field)

            formatted_input = format_object.fromString(text=given_input)
            inputs[field] = formatted_input

        response = requests.post(
            url=f"http://{self.ip}:{self.port}/{self.endpoint}", json=inputs)
        if not response.ok:
            raise REST_Exception(
                message=response.text,
                status=response.status_code
            )
        response = response.json()
        outputs = {}
        for field, val in self.output_fields.items():
            if field not in response:
                raise REST_Exception(
                    message=f"An error occured in the tool.", status=500)

            format_of_field: str = val['type']
            format_object: Format = SupportedFormats.get_format_from_string(
                format_of_field)

            formatted_output = format_object.getTypesAsJson(
                text=response[field],input=list(inputs.values())[0])
            outputs[field] = formatted_output

        return outputs
