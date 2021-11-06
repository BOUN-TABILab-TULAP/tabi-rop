from backend.backend_proxy.tool.formats.formatAbstractClass import Format

class CoNLL(Format):
    def __init__(self,enum) -> None:
        super().__init__()
        self.enum = enum
        self.supportedTypes = {
            "raw": self.raw,
            "brat":self.brat,
        }
    def toString(self, text) -> str:
        return text
        
    def brat(self, text) -> dict:
        return text
    
    def raw(self, text) -> str:
        return text

    def getTypesAsJson(self, text) -> dict:
        d = {}
   
        for t in self.supportedTypes:
            d[t] = self.supportedTypes[t](text)
        return d
       
    def fromString(self, text) -> str:
        return text
