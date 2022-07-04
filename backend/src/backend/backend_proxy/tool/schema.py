from backend.backend_proxy.tool.tool_class import Tool
from backend.backend_proxy.api.exception import IncorrectTypeException, NotFoundException
from marshmallow import Schema, fields

dtime_format = "%d-%m-%Y | %H:%M:%S"

# class NotFoundException(Exception):
#     def __init__(self, field):
#         self.message = f"{field} is not in provided data"
#         super().__init__(self.message)


# class IncorrectTypeException(Exception):
#     def __init__(self, field, expected_type, given_type):
#         self.message = f"Expected type for {field} is {expected_type}; however, given type is {given_type}"
#         super().__init__(self.message)


class ToolSchema():
    fields = {
        "enum": str,
        "name": str,
        "added_by": str,
        "registered_at": str,
        "ip": str,
        "port": int,
        "endpoint": str,
        "input_fields": dict,
        "output_fields": dict,
        "contact_mail":str,
        "general_info":dict,
        "git_address":str,
        "tulap_address":str
    }

    @staticmethod
    def create_object(data, **kwargs):
        for field, field_type in ToolSchema.fields.items():
            if field not in data:
                raise NotFoundException(field=field)
            given_type = type(data[field])
            if field_type != given_type:
                raise IncorrectTypeException(
                    field=field, expected_type=field_type, given_type=given_type)
        return Tool(data)

    @staticmethod
    def dump(tool: Tool) -> dict:
        d = { 
            "enum": tool.enum,
            "name": tool.name,
            "added_by": tool.added_by,
            "registered_at": tool.registered_at,
            "ip": tool.ip,
            "port": tool.port,
            "endpoint": tool.endpoint,
            "contact_mail": tool.contact_mail,
            "input_fields": tool.input_fields,
            "output_fields": tool.output_fields,
            "general_info":tool.general_info,
            "git_address":tool.git_address,
            "tulap_address":tool.tulap_address,
        }

        if hasattr(tool, "_id"):
            d["_id"] = str(tool._id)
        return d
