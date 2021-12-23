import requests
from read_config import get_config
import sys

def debugPrint(*args, **kwargs):
    print(*args, file=sys.stderr, **kwargs)


def send(message, log_if_noerror,):

    payload = None

    if isinstance(message, str):
        if log_if_noerror:
            payload = ':white_check_mark: ' + message
    elif isinstance(message, dict):
        for key, value in message.items():
            payload = f":X: *{key}*: {value}\n"
    
    else:
        payload = f":X: Encountered error(s) in {len(message)} tools\n"
        for error in message:
            for key, value in error.items():
                payload += f"\n *{key}*: {value}\n"
    if payload:
        webHookUrl = get_config("webHookUrl")
        debugPrint(payload)
        requests.post(webHookUrl, json={"text": payload, })
