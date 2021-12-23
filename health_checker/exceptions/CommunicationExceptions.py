class NetworkException(Exception):
    """Exception raised when a network happens while talking with the DIP backend.

    Attributes:
        currentEndpoint -- where are we trying to reach
        statusCode -- what is the status code of the response
    """

    def __init__(self, currentEndpoint, statusCode, text):
        self.currentEndpoint = currentEndpoint
        self.statusCode = statusCode
        self.text = text
        
        self.message = f"There has been an error while trying to the reach endpoint {currentEndpoint}. Status Code returned by the backend is {statusCode}."
        super().__init__(self.message)

class NoResponse(Exception):
    """Exception raised when could not get an output from the tool"""
    
    
    """Attributes:
        tool_name: Name of the tool
        tool_enun: Enum of the tool
    """
    def __init__(self, tool_name, tool_enum, text):
        self.tool_name = tool_name
        self.tool_enum = tool_enum
        
        self.message = f"Could not get an output from tool {tool_enum}. {text}"
        super().__init__(self.message)
