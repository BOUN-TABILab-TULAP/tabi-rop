from backend.backend_proxy.tool.service import ToolService

from mock_tool_controller import MockToolController,mock_tools


service:ToolService = ToolService(controller=MockToolController())

def test_list_all_tools():
    tools = service.list_all_tools()
    assert len(tools) == len(mock_tools)

