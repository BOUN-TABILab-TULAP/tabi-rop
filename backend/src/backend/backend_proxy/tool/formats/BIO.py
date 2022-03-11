from backend.backend_proxy.tool.formats.formatAbstractClass import Format
import subprocess
import json

from backend.backend_proxy.tool.formats.scripts.BIOtoStandoff import BIOtoStandoff


class BIO(Format):
    def __init__(self, enum) -> None:
        super().__init__()
        self.enum = enum
        self.supportedTypes = {
            # "raw": self.raw,
            "json": self.raw,
            "brat":self.brat,
        }

    def toString(self, text) -> str:
        return text

    def brat(self, BIO:dict, input) -> dict:
        bio_text = ""
        for entity in BIO.values():
            bio_text += f"{entity[0]} {'B-PER' if 'PER' in entity[1] else entity[1]}\n"
        return BIOtoStandoff(text=input, bio=bio_text)
        

    def raw(self, text, input) -> str:
        return text

    def getTypesAsJson(self, text, input="") -> dict:
        d = {}

        for t in self.supportedTypes:
            d[t] = self.supportedTypes[t](text, input=input)
        return d

    def fromString(self, text) -> str:
        return text
