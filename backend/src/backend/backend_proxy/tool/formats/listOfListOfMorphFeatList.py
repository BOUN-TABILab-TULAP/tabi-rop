from backend.backend_proxy.tool.formats.formatAbstractClass import Format
from json import loads 

class ListOfListOfMorphFeatList(Format):
    def __init__(self,enum) -> None:
        super().__init__()
        self.enum = enum
        self.supportedTypes = {
            "raw": self.raw,
            "json":self.json,
        }
    def toString(self, text) -> str:
        return text
        
    def json(self, text) -> dict:
        output = []
        sentences = text.split(
            "--------------------------------------------------")

        for sentence in sentences:
            if sentence == "":
                continue
            tokens = sentence.split("\n")
            lastkey = ""
            for token in tokens:
                if not token.startswith("\t"):
                    if(lastkey != ""):
                        output.append({lastkey: findings})
                    lastkey = token.strip()
                    findings = []
                else:
                    findings.append(token.strip())
        return loads(str(output).replace("'",'"'))
    
    def raw(self, text) -> str:
        return text

    def getTypesAsJson(self, text) -> dict:
        d = {}

        for t in self.supportedTypes:
            d[t] = self.supportedTypes[t](text)
        return d
        
    def fromString(self, text) -> str:
        return text
