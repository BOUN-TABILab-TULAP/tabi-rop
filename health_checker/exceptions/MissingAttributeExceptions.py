class MissingTestcaseException(Exception):
    """Exception raises when health tool cannot find a testcase for the current tool"""

    """Attributes:
        tool_enun: Enum of the tool
    """
    def __init__(self,  tool_enum):
        self.tool_enum = tool_enum
        
        self.message = f"Could not find a testcase for {tool_enum}"
        super().__init__(self.message)

