import json
import sys
import time
from datetime import datetime
from backend.backend_proxy.logging.event_controller import EventController

def debugPrint(*args, **kwargs):
    print(*args, file=sys.stderr, **kwargs)

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
    
    def save(self):
        dto: dict= {
            "enum": self.tool_enum,
            "createdAt": str(datetime.fromtimestamp(self.start_timestap))
         } 
        if hasattr(self, 'input'):
            dto['input_raw'] = str(self.input)
            try:
                dto['input'] = json.loads(self.input)
            except Exception as e:
                debugPrint(e)
        
        if hasattr(self, 'output'):
            dto['output'] = self.output
        
        if hasattr(self, 'isSuccessful'):
            dto['successful'] = self.isSuccessful

        EventController().save_event(dto)

