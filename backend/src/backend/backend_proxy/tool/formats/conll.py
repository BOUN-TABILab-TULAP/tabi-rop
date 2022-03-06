from backend.backend_proxy.tool.formats.formatAbstractClass import Format
import subprocess
import json

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
        p = subprocess.run(args=["node","/app/src/backend/backend_proxy/tool/formats/scripts/conllu.js",text],capture_output=True)
        decoded =  p.stdout.decode("utf-8")
        return json.loads(decoded)
    
    def raw(self, text) -> str:
        return text

    def getTypesAsJson(self, text) -> dict:
        d = {}
   
        for t in self.supportedTypes:
            d[t] = self.supportedTypes[t](text)
        return d
       
    def fromString(self, text) -> str:
        return text
