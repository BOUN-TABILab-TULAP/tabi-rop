import datetime
from unittest import mock
from backend.backend_proxy.tool.controller.abstract_controller import AbstractToolController

from mock_tool_class import MockToolClass

mock_tools = [
    MockToolClass(tool_dict={
        "_id": "1",
        "name": "tool_1",
        "enum": "enum_1",
        "added_by": "no_user"
    }),
    MockToolClass(tool_dict={
        "_id": "2",
        "name": "tool_2",
        "enum": "enum_2",
        "added_by": "no_user"
    }),
    MockToolClass(tool_dict={
        "_id": "3",
        "name": "tool_3",
        "enum": "enum_3",
        "added_by": "no_user"
    }),
]


class MockToolController(AbstractToolController):
    mock_tools = mock_tools
    def __init__(self) -> None:
        pass
    def update_tool(self, tool_id: str, tool_info: dict) -> MockToolClass:
        pass

    def dump_tool(self, tool: MockToolClass) -> dict:
        return {}
    def get_tool(self, tool_id: str) -> MockToolClass:
        for tool in self.mock_tools:
            if tool._id == tool_id:
                return tool
        return None

    def get_tool_query(self, query: dict) -> MockToolClass:
        for tool in self.mock_tools:
            if "_id" in query and tool._id != query['_id']:
                continue
            if "name" in query and tool.name != query['name']:
                continue
            if "enum" in query and tool.enum != query['enum']:
                continue
            if "added_by" in query and tool.added_by != query['added_by']:
                continue
            return tool
        return None

    def create_tool(self, tool_info: dict) -> MockToolClass:
        try:
            tool_info['registered_at'] = datetime.datetime.now().strftime(
                '%Y-%m-%dT%H:%M:%S')
            self.mock_tools.append(MockToolClass(tool_dict=tool_info))
            return True
        except Exception as e:
            return False

    def get_all_tools(self) -> list[MockToolClass]:
        return self.mock_tools
