from random import randint
from backend.backend_proxy.api.exception import REST_Exception

from backend.backend_proxy.user.service import UserService
from mock_user_controller import MockUserController


userService = UserService(controller=MockUserController())

def get_admin_token():
    req = {
        "username": "user3",
        "password": "password3"
    }
    res = userService.login_user(req)
    return res['token']
def test_register_successful():
    req = {
        "username": f"user_{randint(0,10e5)}",
        "password": "password5",
        "email": "email5",
    }
    res = userService.create_user(req_dict=req,token=get_admin_token())
    assert res == True


def test_register_user_exists():
    req = {
        "username": "user3",
        "password": "password5",
        "email": "email5",
    }
    try:
        res = userService.create_user(req_dict=req,token=get_admin_token())
    except REST_Exception as e:
        assert e.message == "Username is already taken"
        assert e.status == 400


def test_register_no_username():
    req = {

        "password": "password6",
        "email": "email5",
    }
    try:
        res = userService.create_user(req_dict=req,token=get_admin_token())
    except REST_Exception as e:
        assert e.message == "You must provide an username"
        assert e.status == 400


def test_register_no_password():
    req = {
        "username": "user6",
        "email": "email5",
    }
    try:
        res = userService.create_user(req_dict=req,token=get_admin_token())
    except REST_Exception as e:
        assert e.message == "You must provide a password"
        assert e.status == 400


def test_register_no_email():
    req = {
        "username": "user6",
        "password": "password6",
    }
    try:
        res = userService.create_user(req_dict=req,token=get_admin_token())
    except REST_Exception as e:
        assert e.message == "You must provide an email"
        assert e.status == 400
