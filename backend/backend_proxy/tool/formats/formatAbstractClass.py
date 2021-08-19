from abc import ABC, abstractmethod, abstractproperty
from backend_proxy.tool.formats.supportedFormats import SupportedFormats  # for abstract class


class Format(ABC):
    @property
    @abstractmethod
    def formatEnum():
        raise NotImplementedError

    @abstractmethod
    def toString(self) -> str:
        return


