from backend.backend_proxy.tool.formats.formatAbstractClass import Format


class MWE(Format):
    def __init__(self, enum) -> None:
        super().__init__()
        self.enum = enum
        self.supportedTypes = {
            # "raw": self.raw,
            "raw": self.raw,
            "mwe":self.raw,
        }

    def toString(self, text) -> str:
        return text
      
    def raw(self, text, input) -> str:
        return text

    def getTypesAsJson(self, text, input="") -> dict:
        d = {}

        for t in self.supportedTypes:
            d[t] = self.supportedTypes[t](text, input=input)
        return d

    def fromString(self, text) -> str:
        return text
