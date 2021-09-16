# from backend.backend_proxy.tool.service import ToolService

import pytest
from backend.backend_proxy.api.exception import REST_Exception
from backend.backend_proxy.tool.schema import ToolSchema
from backend.backend_proxy.tool.service import ToolService


def test_me():
    assert 1 == 1


def test_enumAbsence(toolService: ToolService):
    req_dict = {
        "": ""
    }
    with pytest.raises(REST_Exception):
        toolService.add_tool(req_dict)


def test_enumAlreadyExists(toolService: ToolService):
    existingTools : list[dict]= toolService.get_tool_names()
    print(f"found {len(existingTools)} existing tools")
    if len(existingTools) == 0:
        pass

    req_dict = {
        "enum":existingTools[0]['enum']
    }
    print(req_dict)
    with pytest.raises(REST_Exception):
        toolService.add_tool(req_dict)

