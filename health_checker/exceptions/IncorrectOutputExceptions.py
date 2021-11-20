class MissingField(Exception):
    """Exception raised when there is a missing field in the response.
    For example, field "json" is not in the response.

    Attributes:
        tool_name: Name of the tool
        tool_enun: Enum of the tool
        missing_field:  Which field is absent in the response 
    """

    def __init__(self, tool_enum, expected_fields, returned_fields):
        self.tool_enum = tool_enum
        self.expected_fields = expected_fields
        self.returned_fields = returned_fields
        
        self.message = f"{tool_enum}\'s expected fields are: \n{expected_fields}\nhowever, returned fields are:\n{returned_fields}"
        super().__init__(self.message)




