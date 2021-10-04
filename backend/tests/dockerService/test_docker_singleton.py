from backend.backend_proxy.containerization.service import DockerService
from random import randint

def test_singleton():
    """Tool Service must be singleton"""

    # We do not want to initialize the instance 
    object1 = object.__new__(DockerService)
    object2 = object.__new__(DockerService)
    
    randomValue = randint(0,1000)
    object1.randomValue = randomValue
    object2.randomValue = randomValue
    assert object1.randomValue == object2.randomValue 
    