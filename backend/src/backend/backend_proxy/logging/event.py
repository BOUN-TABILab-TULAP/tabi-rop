import time
class Event:
    def __init__(self,tool_enum:str) -> None:
        self.tool_enum = tool_enum
        self.start_timestap = time.time()

    def finish_event(self, status_code)-> None:
        self.finish_timestap = time.time()
        self.status_code = status_code
    def __str__(self) -> str:
        # This format is called logfmt. We are using this to further investigate and analyze logs in Grafana
        return f"enum={self.tool_enum} time={(self.finish_timestap - self.start_timestap):.2f}  status={self.status_code}"
        # return f"Request to {self.tool_enum} finished in {(self.finish_timestap - self.start_timestap):.2f} seconds with status code {self.status_code}."
