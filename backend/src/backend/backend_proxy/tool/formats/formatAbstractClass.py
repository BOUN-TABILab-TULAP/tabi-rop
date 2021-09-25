from abc import ABC, abstractmethod, abstractproperty


class Format(ABC):
    def __init__(self) -> None:
        super().__init__()

    @abstractmethod
    def getTypesAsJson(self,text) -> str:
        return
        
    @abstractmethod
    def toString(self,text) -> str:
        return

    @abstractmethod
    def fromString(self,text) -> str:
        return


