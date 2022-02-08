import sys
from backend.backend_proxy.tool.abstract_tool_class import AbstractToolClass
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
        self.description = tool_dict["description"]
        self.contact_mail = tool_dict["contact_mail"]
        self.input_fields = tool_dict["input_fields"]
        self.output_fields = tool_dict["output_fields"]

    def run(self, parameters: dict) -> dict:
        parsed_inputs = {}
        for format_index, current_format in enumerate(self.inputFormats):
            current_format = self.inputFormats[format_index]
            output = current_format["type"]
            output_format_enum = SupportedFormats.strToEnum(output)
            SupportedFormats.formatsMap[output_format_enum].fromString(
                parameters[f"input_{format_index}"])
            parsed_inputs[current_format['field']
                          ] = parameters[f"input_{format_index}"]

        response = requests.post(
            url=f"http://{self.ip}:{self.port}/{self.endpoint}", json=parsed_inputs)
        if not response.ok:
            raise REST_Exception(
                message=response.text,
                status=response.status_code
            )
        response = response.json()
        parsedOutputs = {}
        for format_index in range(len(self.outputFormats)):
            current_format = self.outputFormats[format_index]
            output = current_format["type"]
            output_format_enum = SupportedFormats.strToEnum(output)
            parsedOutputs[current_format['field']] = SupportedFormats.formatsMap[output_format_enum].getTypesAsJson(
                response[current_format['field']])
        return parsedOutputs
    