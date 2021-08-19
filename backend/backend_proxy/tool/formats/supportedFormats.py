from enum import Enum, auto


class SupportedFormats(Enum):
    TokenizedSentence = 1
    ListOfListOfMorphFeatList = 2
    Format_3 = 3
    Format_4 = 4

    
    @staticmethod
    def checkIfIncludes(selectedFormat: str,supportedFormatsOfTools)-> bool:
        return selectedFormat in [item.name for item in supportedFormatsOfTools]
