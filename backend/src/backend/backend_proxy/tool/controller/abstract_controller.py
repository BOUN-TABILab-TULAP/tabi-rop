from abc import ABC, abstractmethod
from backend.backend_proxy.tool.abstract_tool_class import AbstractToolClass
from backend.backend_proxy.tool.tool_class import Tool

from backend.backend_proxy.user.user_class import User


class AbstractToolController(ABC):

    @abstractmethod
    def __init__(self) -> None: pass

    @abstractmethod
    def get_tool(self, tool_id: str) -> AbstractToolClass: pass

    @abstractmethod
    def get_tool_query(self, query: dict) -> AbstractToolClass: pass

    @abstractmethod
    def create_tool(self, tool_info: dict) -> AbstractToolClass: pass

    @abstractmethod
    def update_tool(self, tool_id: str, tool_info: dict) -> AbstractToolClass: pass

    @abstractmethod
    def delete_tool(self, tool_id: str) -> bool: pass

    @abstractmethod
    def get_all_tools(self) -> list[AbstractToolClass]: pass

    @abstractmethod
    def dump_tool(self, tool: AbstractToolClass) -> dict: pass
