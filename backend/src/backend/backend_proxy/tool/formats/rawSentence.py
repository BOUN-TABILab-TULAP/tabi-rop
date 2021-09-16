from backend.backend_proxy.tool.formats.formatAbstractClass import Format


class RawSentence(Format):
    def __init__(self,enum) -> None:
        super().__init__()
        self.enum = enum

    def toString(self, text) -> str:
        return text
    
    def fromString(self, text) -> str:
        return text
