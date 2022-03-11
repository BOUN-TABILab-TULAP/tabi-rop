from backend.backend_proxy.tool.formats.formatAbstractClass import Format
import subprocess
import json

from backend.backend_proxy.tool.formats.scripts import BIOtoStandoff

class BIO(Format):
    def __init__(self,enum) -> None:
        super().__init__()
        self.enum = enum
        self.supportedTypes = {
            # "raw": self.raw,
            "json": self.raw,
            # "brat":self.brat,
        }
    def toString(self, text) -> str:
        return text
        
    def brat(self, text) -> dict:
        BIOtoStandoff()
    
    def raw(self, text) -> str:
        return text
    
    def getTypesAsJson(self, text) -> dict:
        d = {}
   
        for t in self.supportedTypes:
            d[t] = self.supportedTypes[t](text)
        return d
       
    def fromString(self, text) -> str:
        return text
