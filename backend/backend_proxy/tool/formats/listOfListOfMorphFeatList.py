from backend_proxy.tool.formats.formatAbstractClass import Format
from backend_proxy.tool.formats.supportedFormats import SupportedFormats


class ListOfListOfMorphFeatList(Format):
    def __init__(self) -> None:
        super().__init__()
        formatEnum = SupportedFormats.ListOfListOfMorphFeatList

    def toString(self, text) -> str:
        return text
