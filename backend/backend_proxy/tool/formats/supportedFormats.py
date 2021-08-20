from backend_proxy.tool.formats.tokenizedSentence import TokenizedSentence
from backend_proxy.tool.formats.listOfListOfMorphFeatList import ListOfListOfMorphFeatList
from enum import Enum, auto


class SupportedFormats(Enum):
    TokenizedSentence = auto()
    ListOfListOfMorphFeatList = auto()
    Format_3 = auto()
    Format_4 = auto()


    @staticmethod
    def strToEnum(string):
        return enumMap[string]

    @staticmethod
    def checkIfIncludes(selectedFormat: str, supportedFormatsOfTools) -> bool:
        return selectedFormat in [item.name for item in supportedFormatsOfTools]


SupportedFormats.formatsMap = {
    SupportedFormats.TokenizedSentence : TokenizedSentence(SupportedFormats.TokenizedSentence),
    SupportedFormats.ListOfListOfMorphFeatList : ListOfListOfMorphFeatList(SupportedFormats.ListOfListOfMorphFeatList),
} 

enumMap = {
    "TokenizedSentence": SupportedFormats.TokenizedSentence,
    "ListOfListOfMorphFeatList": SupportedFormats.ListOfListOfMorphFeatList,
}
