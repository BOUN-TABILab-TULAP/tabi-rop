from abc import ABC, abstractmethod


class AbstractToolClass(ABC):

    @abstractmethod
    def __init__(self, tool_dict: dict) -> None: pass

    @abstractmethod
    def run(self, parameters: dict) -> dict: pass



