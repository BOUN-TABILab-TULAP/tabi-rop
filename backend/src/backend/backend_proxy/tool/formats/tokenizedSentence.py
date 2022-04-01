from backend.backend_proxy.tool.formats.formatAbstractClass import Format


class TokenizedSentence(Format):
    def __init__(self, enum) -> None:
        super().__init__()
        self.enum = enum
        self.supportedTypes = {
            "raw": self.raw
        }

    def getTypesAsJson(self, text, input="") -> str:
        d = {}

        for t in self.supportedTypes:
            d[t] = self.supportedTypes[t](text)
        return d

    def toString(self, text) -> str:
        return text

    def fromString(self, text) -> str:
        return text

    def raw(self, text) -> str:
        return text
