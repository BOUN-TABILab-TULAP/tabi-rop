from backend.backend_proxy.tool.formats.formatAbstractClass import Format


class RawSentence(Format):
    def __init__(self, enum) -> None:
        super().__init__()
        self.enum = enum
        self.supportedTypes = {
            "raw": self.raw
        }

    def toString(self, text) -> str:
        return text

    def fromString(self, text) -> str:
        return text

    def getTypesAsJson(self, text) -> str:
        return text

    def raw(self, text) -> str:
        return text
