from backend.backend_proxy.tool.formats.conll import CoNLL
from backend.backend_proxy.tool.formats.rawSentence import RawSentence
from backend.backend_proxy.tool.formats.tokenizedSentence import TokenizedSentence
from backend.backend_proxy.tool.formats.listOfListOfMorphFeatList import ListOfListOfMorphFeatList
from enum import Enum, auto

from backend.backend_proxy.tool.formats.json import JSON


class SupportedFormats(Enum):
    TokenizedSentence = auto()
    ListOfListOfMorphFeatList = auto()
    RawSentence = auto()
    CoNLL = auto()
    json = auto()


    @staticmethod
    def strToEnum(string):
        return enumMap[string]

    @staticmethod
    def checkIfIncludes(selectedFormat: str, supportedFormatsOfTools) -> bool:
        return selectedFormat in [item.name for item in supportedFormatsOfTools]
    
    @staticmethod
    def getSupportedTypes()-> dict:
        d = {}
        for enum in enumMap:
            d[enum] = list(SupportedFormats.formatsMap[enumMap[enum]].supportedTypes.keys())
        return d




SupportedFormats.formatsMap = {
    SupportedFormats.TokenizedSentence : TokenizedSentence(SupportedFormats.TokenizedSentence),
    SupportedFormats.ListOfListOfMorphFeatList : ListOfListOfMorphFeatList(SupportedFormats.ListOfListOfMorphFeatList),
    SupportedFormats.RawSentence : RawSentence(SupportedFormats.RawSentence),
    SupportedFormats.CoNLL : CoNLL(SupportedFormats.CoNLL),
    SupportedFormats.json : JSON(SupportedFormats.json),
} 

enumMap = {
    "TokenizedSentence": SupportedFormats.TokenizedSentence,
    "ListOfListOfMorphFeatList": SupportedFormats.ListOfListOfMorphFeatList,
    "RawSentence": SupportedFormats.RawSentence,
    "CoNLL": SupportedFormats.CoNLL,
    "JSON":SupportedFormats.json
}
