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
