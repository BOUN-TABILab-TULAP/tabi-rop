import sys
import requests
from backend.backend_proxy.api.exception import REST_Exception
from backend.backend_proxy.tool.formats.supportedFormats import SupportedFormats


def debugPrint(*args, **kwargs):
    print(*args, file=sys.stderr, **kwargs)


class Tool:
    def __init__(self, enum: str, ip: str, port: int, inputFormats: list[SupportedFormats], outputFormats: list[SupportedFormats], version: str, endpoint: str) -> None:
        self.enum = enum
        self.ip = ip
        self.port = port
        self.inputFormats = inputFormats
        self.outputFormats = outputFormats
        self.version = version  # TODO Use this
        self.endpoint = endpoint

    def run(self, parameters: dict) -> dict:
        parsed_inputs = {}
        for format_index, current_format in enumerate(self.inputFormats):
            current_format = self.inputFormats[format_index]
            output = current_format["type"]
            output_format_enum = SupportedFormats.strToEnum(output)
            SupportedFormats.formatsMap[output_format_enum].fromString(
                parameters[f"input_{format_index}"])
            parsed_inputs[current_format['field']] = parameters[f"input_{format_index}"]

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

    # TODO
    def delete(self):
        raise NotImplementedError
    # TODO

    def update(self):
        raise NotImplementedError
