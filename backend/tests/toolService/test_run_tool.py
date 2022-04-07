from backend.backend_proxy.api.exception import REST_Exception
from backend.backend_proxy.tool.service import ToolService

from mock_tool_controller import MockToolController, mock_tools


service: ToolService = ToolService(controller=MockToolController())


def test_run_tool_invalid_enum():
    enum = "invalid_enum"
    try:
        service.run_tool(enum=enum, input_dict={})
    except REST_Exception as e:
        assert e.message == f"The enum: {enum} could not be found in active tools."
        assert e.status == 400


def test_run_tool():
    selected_tool = mock_tools[0]
    enum = selected_tool.enum
    input_params = {
        "field_1": 1,
        "field_2": 2,
        "foo": "bar"
    }
    response = service.run_tool(enum=enum, input_dict=input_params)
    assert response == {"field_1": 1,
                        "field_2": 2,
                        "foo": "bar", "name": selected_tool.name,
                        "added_by": selected_tool.added_by,
                        "_id":selected_tool._id,
                        "enum": selected_tool.enum}
