import requests
from flask import app, Flask
import atexit
from apscheduler.schedulers.background import BackgroundScheduler
from read_config import get_config
import slackTool
from testcases import givenInputs, expectedOutputs
from exceptions.CommunicationExceptions import NetworkException, NoResponse
from exceptions.IncorrectOutputExceptions import MissingField
from exceptions.MissingAttributeExceptions import MissingTestcaseException

catchable_exceptions = (NetworkException, NoResponse,
                        MissingField, MissingTestcaseException)


backendURL = get_config("backendURL")



def get_all_tools(endpoint="/tools/name"):
    """
    Send a request to DIP backend in order to get all the tools registered to system. 
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
            "name": tool['name'],

        } for tool in tools]


def make_request(tool, endpoint="/tool/run/"):
    enum = tool['enum']
    name = tool['name']
    reqURL = backendURL + endpoint + enum

    if enum not in givenInputs or enum not in expectedOutputs:
        raise MissingTestcaseException(tool_enum=enum)
    givenInput = givenInputs[enum]
    expectedOutput = expectedOutputs[enum]

    response = requests.post(reqURL, json=givenInput)
    if not response.ok:
        raise NoResponse(
            tool_enum=enum, tool_name=name)
    response_body = response.json()
    returned_fields = {}
    for field in response_body:
        returned_fields[field] = list(response_body[field].keys())
    if returned_fields != expectedOutput:
        raise MissingField(
            tool_enum=enum, expected_fields=expectedOutput, returned_fields=returned_fields)


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


def checker(log_if_noerror=True):
    tools, output = None, None
    try:
        tools = get_all_tools()
    except NetworkException as e:
        output = {'Fatal Error':e.message}
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
    scheduler.add_job(func=checker, trigger="interval", seconds=360)
    scheduler.start()

    # Shut down the scheduler when exiting the app
    atexit.register(lambda: scheduler.shutdown())
    app.run(host='0.0.0.0', port=5000)
