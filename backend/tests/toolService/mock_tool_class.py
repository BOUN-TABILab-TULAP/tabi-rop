from backend.backend_proxy.tool.abstract_tool_class import AbstractToolClass


class MockToolClass(AbstractToolClass):
    def __init__(self, tool_dict: dict) -> None:
        self.name = tool_dict['name']
        self.enum = tool_dict['enum']
        self.added_by = tool_dict['added_by']
        self._id = tool_dict['_id']

    def run(self, parameters: dict) -> dict:
        parameters.update({
            "_id": self._id,
            "name": self.name,
            "enum": self.enum,
            "added_by":self.added_by
        })
        return parameters
