from backend.backend_proxy.api.exception import REST_Exception

from backend.backend_proxy.user.service import UserService
from mock_user_controller import MockUserController


userService = UserService(controller=MockUserController())


def test_login_successful_standart():
    req = {
        "username": "user1",
        "password": "password1"
    }
    res = userService.login_user(req)
    assert res['username'] == "user1"
    assert res['user_type'] == "standart"


def test_login_successful_admin():
    req = {
        "username": "user3",
        "password": "password3"
    }
    res = userService.login_user(req)
    assert res['username'] == "user3"
    assert res['user_type'] == "administrator"


def test_login_username_not_found():
    req = {
        "username": "user4",
        "password": "password3"
    }
    try:
        res = userService.login_user(req)
    except REST_Exception as e:
        assert e.message == f"User {req['username']} does not exist"
