class REST_Exception(Exception):
    """
    - Custom exception class that is used to return 
        client error messages together with the status code.
    - 401 HTTP code is Unauthorized, however 
        this application uses 401 to denote "Not Authenticated" only.
    - Every other error uses the code 400 with 
        relevant explanation in the message
    """

    def __init__(self, message="Error", status=400):
        self.message = message
        self.status = status
        super().__init__(self.message)

class NotFoundException(Exception):
    def __init__(self, field):
        self.message = f"{field} is not in provided data"
        self.status = 400
        super().__init__(self.message)

class IncorrectTypeException(Exception):
    def __init__(self, field, expected_type, given_type):
        self.message = f"Expected type for {field} is {expected_type}; however, given type is {given_type}"
        self.status = 400
        super().__init__(self.message)