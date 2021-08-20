from backend_proxy.api.exception import REST_Exception
from backend_proxy.tool.formats.supportedFormats import SupportedFormats
import requests
import sys

def debugPrint(*args, **kwargs):
    print(*args, file=sys.stderr, **kwargs)

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
        # TODO(Muhammet) This should be given as a parameter
        self.jsonOutputKeyword = "text"

    def run(self, parameters: dict):
        # BUG We expect one input format and one output format. We may need multiple formats
        if "inputFormat" not in parameters.keys():
            raise REST_Exception(
                message=f"You need to specify an import format.",
                status=400
            )
        inputFormat = parameters["inputFormat"]
        inputFormatEnum = SupportedFormats.strToEnum(inputFormat)

        if not SupportedFormats.checkIfIncludes(inputFormat, self.inputFormats):
            raise REST_Exception(
                message=f"This tool does not work with the selected input format {inputFormat}.",
                status=400
            )

        if "outputFormat" not in parameters.keys():
            raise REST_Exception(
                message=f"You need to specify an output format.",
                status=400
            )
        outputFormat = parameters["outputFormat"]
        outputFormatEnum = SupportedFormats.strToEnum(outputFormat)

        if not SupportedFormats.checkIfIncludes(outputFormat, self.outputFormats):
            raise REST_Exception(
                message=f"This tool does not work with the selected output format {outputFormat}.",
                status=400
            )

        # if inputFormatEnum not in SupportedFormats._member_names_:
        #     raise REST_Exception(
        #         message=f"DIP system does not support the selected input format {inputFormatEnum}. Supported input formats: {', '.join([f.name for f in self.inputFormats])}",
        #         status=400
        #     )

        if self.jsonKeyword not in parameters.keys():
            raise REST_Exception(
                message=f"You need to specify an input",
                status=400
            )
        given = parameters[self.jsonKeyword]
        givenParsed = SupportedFormats.formatsMap[inputFormatEnum].fromString(
            given)
        response = requests.post(
            url=f"http://{self.ip}:{self.port}/{self.endpoint}",
            json={
                self.jsonKeyword: givenParsed}
        )
        print(response.status_code)
        if not response.ok:
            raise REST_Exception(
                message=response.text,
                status=response.status_code
            )
        text = response.json()[self.jsonOutputKeyword]
        debugPrint(f"output text: {text}")
        parsed = SupportedFormats.formatsMap[outputFormatEnum].toString(text)
        debugPrint(f"parsed text: {parsed}\n\n")
        
        return {self.jsonOutputKeyword: parsed}

    #TODO
    def delete(self):
        raise NotImplementedError
    #TODO
    def update(self):
        raise NotImplementedError
