from backend_proxy.api.exception import REST_Exception
import requests
from backend_proxy.tool.formats.formatAbstractClass import Format
from backend_proxy.tool.formats.supportedFormats import SupportedFormats


class Tool:
    def __init__(self, enum: str, ip: str, port: int, inputFormats: list[SupportedFormats], outputFormats: list[SupportedFormats], version: str) -> None:
        self.enum = enum
        self.ip = ip
        self.port = port
        self.inputFormats = inputFormats
        self.outputFormats = outputFormats
        self.version = version  # TODO Use this

        # TODO (Muhammet) This should be given as a parameter
        self.endpoint = "evaluate"
        # TODO(Muhammet) This should be given as a parameter
        self.jsonKeyword = "textarea"

    def run(self, parameters: dict):
        # BUG We expect one input format and one output format. We may need multiple formats
        if "inputFormat" not in parameters.keys():
            raise REST_Exception(
                message=f"You need to specify an import format.",
                status=400
            )
        inputFormatEnum = parameters["inputFormat"]
        if not SupportedFormats.checkIfIncludes(inputFormatEnum, self.inputFormats):
            raise REST_Exception(
                message=f"This tool does not work with the selected input format {inputFormatEnum}.",
                status=400
            )

        if "outputFormat" not in parameters.keys():
            raise REST_Exception(
                message=f"You need to specify an output format.",
                status=400
            )
        outputFormatEnum = parameters["outputFormat"]
        if not SupportedFormats.checkIfIncludes(outputFormatEnum, self.outputFormats):
            raise REST_Exception(
                message=f"This tool does not work with the selected output format {outputFormatEnum}.",
                status=400
            )

        # if inputFormatEnum not in SupportedFormats._member_names_:
        #     raise REST_Exception(
        #         message=f"DIP system does not support the selected input format {inputFormatEnum}. Supported input formats: {', '.join([f.name for f in self.inputFormats])}",
        #         status=400
        #     )

        if "input" not in parameters.keys():
            raise REST_Exception(
                message=f"You need to specify an input",
                status=400
            )

        response = requests.post(
            url=f"http://{self.ip}:{self.port}/{self.endpoint}",
            json={
                self.jsonKeyword: parameters['input']}
        )
        print(response.status_code)
        if not response.ok:
            return REST_Exception(
                message=response.text,
                status=response.status_code
            )
        return response.json()

    def delete(self):
        raise NotImplementedError

    def update(self):
        raise NotImplementedError
