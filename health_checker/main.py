import requests
from flask import app, Flask
import atexit
from apscheduler.schedulers.background import BackgroundScheduler
from read_config import get_config
import slackTool
from exceptions.CommunicationExceptions import NetworkException, NoResponse
from exceptions.IncorrectOutputExceptions import MissingField
from exceptions.MissingAttributeExceptions import MissingExampleException

catchable_exceptions = (NetworkException, NoResponse,
                        MissingField, MissingExampleException)


backendURL = get_config("backendURL")



def get_all_tools(endpoint="/tools/name"):
    """
    Send a request to TULAP backend in order to get all the tools registered to system. 
    """

    res = requests.get(url=backendURL + endpoint)
    if not res.ok:
        raise NetworkException(
            currentEndpoint=endpoint, statusCode=res.status_code, text=res.text)
    tools = res.json()
    "We do not need all the fields returned."
    return [
        {
            "enum": tool['enum'],
            "name": tool['general_info']['en']['name'],
            "inputs": tool['input_fields'],
            "outputs": tool['output_fields'],
        } for tool in tools]


def restart_tool(tool_enum):
    endpoint = backendURL + '/tool/restart/' + tool_enum

    response = requests.post(endpoint, json={'secret': get_config('secret')})
    if response.ok:
        is_successful = response.json()
        if is_successful:
            return "Restarted the tool"
    return "Could not restarted the tool"


def make_request(tool, endpoint="/tool/run/"):
    enum = tool['enum']
    name = tool['name']
    inputs = tool['inputs']
    outputs = tool['outputs']

    reqURL = backendURL + endpoint + enum
    payload = {}

    for field in inputs:
        if 'examples' not in inputs[field] or len(inputs[field]['examples']) < 1:
            raise MissingExampleException(tool_enum=enum)
        payload[field] = inputs[field]['examples'][0]

    response = requests.post(reqURL, json=payload)
    if not response.ok:
        raise NoResponse(
            tool_enum=enum, tool_name=name, text=restart_tool(enum))

    response_body = response.json()
    
    for output_field in outputs:
        if output_field not in response_body:
            raise MissingField(
            tool_enum=enum, expected_fields=outputs.keys(), returned_fields=response_body.keys())

def send_requests(tools, endpoint="/tool/run/"):
    output = []
    for tool in tools:
        try:
            make_request(tool)
        except catchable_exceptions as e:
            output.append({tool['enum']: e.message})
    if output:
        return output
    return "Everything seems to be working!"


app = Flask(__name__)


def checker(log_if_noerror=False):
    tools, output = None, None
    try:
        tools = get_all_tools()
    except NetworkException as e:
        output = {'Fatal Error': e.message}
    if tools:
        output = send_requests(tools=tools)
    slackTool.send(output, log_if_noerror)


@app.route("/health/check", methods=["POST"])
def check_health():

    response = app.response_class(
        response="Starting the check!",
        status=200,
        mimetype='application/json'
    )

    @response.call_on_close
    def initiate():
        checker(log_if_noerror=True)

    return response


if __name__ == '__main__':

    scheduler = BackgroundScheduler()
    scheduler.add_job(func=checker, trigger="interval", seconds=3600)
    scheduler.start()

    # Shut down the scheduler when exiting the app
    atexit.register(lambda: scheduler.shutdown())
    app.run(host='0.0.0.0', port=5000)
