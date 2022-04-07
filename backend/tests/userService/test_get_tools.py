from backend.backend_proxy.api.exception import REST_Exception

from backend.backend_proxy.user.service import UserService
from mock_user_controller import MockUserController


userService = UserService(controller=MockUserController())

def test_get_all_users_with_standart():
    req = {
        "username": "user1",
        "password": "password1"
    }
    res = userService.login_user(req)  # standart user
    token = res['token']
    try:
        userService.get_users(token=token)
    except REST_Exception as e:
        print(e.__dict__)
        assert e.message == "You don't have the right to see other users"
        assert e.status == 401


def test_get_all_users_with_admin():
    req = {
        "username": "user3",
        "password": "password3"
    }
    res = userService.login_user(req)  # standart user
    token = res['token']
    users = userService.get_users(token=token)
    assert len(users) > 0

