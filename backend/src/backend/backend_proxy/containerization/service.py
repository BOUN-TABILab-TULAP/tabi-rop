from backend.backend_proxy.api.exception import REST_Exception
from os import name, path, stat
from backend.backend_proxy.tool.tool_class import Tool
from backend.backend_proxy.user.user_class import User
import docker
from docker.api import container, image
from backend.backend_proxy.config import Config
from backend.backend_proxy.db.mongoDB import MongoDB
from backend.backend_proxy.user.service import UserService
import sys



def debugPrint(*args, **kwargs):
    print(*args, file=sys.stderr, **kwargs)


class DockerService:
    __instance__ = None
    _initialized = False
    runningContainers = {}

    def __new__(cls, *args, **kwargs):
        if cls.__instance__ is None:
            cls.__instance__ = object.__new__(cls, *args, **kwargs)
            cls.__instance__._initialized = False
        return cls.__instance__

    def __init__(self):
        if self._initialized:
            return
        self._initialized = True

        self.dockerClient = docker.from_env()
        existingTools = list(MongoDB.getInstance().find_all("tool"))
        debugPrint(f"Found {len(existingTools)} existing tools")
        for tool in existingTools:
            container_name = f"{tool['enum']}-container"
            try:
                runningContainer = self.dockerClient.containers.get(
                    f"{tool['enum']}-container")
                ports = runningContainer.ports
                port = int(ports[list(ports.keys())[0]][0]['HostPort'])
                tool['port'] = port
                MongoDB.getInstance().db['tool'].update_one({u'_id': tool['_id']}, {
                    "$set": {"port": port}})
                self.runningContainers[container_name] = tool
            except docker.errors.NotFound as e:  # Tool is registered to the database but does not exist in docker
                debugPrint(e)
                # TODO(Muhammet) What to do when container cannot be found
                pass
            except IndexError as indexError:
                debugPrint(indexError)
                debugPrint(f"{container_name} does not have a port!")
                pass

    # Takes a dockerfile, enum and the version of the tool, creates an image, runs a container and returns the port of the container.
    # path_dockerfile: Path of the Dockerfile
    # name_enum: Enum of the tool, for naming the image and container
    # version: version of the tool

    def create_new_container(self, dockerfilePath: str, nameEnum: str) -> int:
        naming = f"{nameEnum}".lower()
        imageTag = naming + "-image"
        containerTag = naming + "-container"
        debugPrint(f"Creating a new container with {containerTag}")

        createdImage = self.dockerClient.images.build(
            path=f"/app/{dockerfilePath}",
            dockerfile=f"/app/{dockerfilePath}/Dockerfile",
            tag=imageTag
        )
        # images.build returns two objects. First one is image that was build, second is generator of the build logs as JSON-decoded objects.
        # We do not need the latter so just take the [0]
        # 3
        imageConfig = createdImage[0].attrs
        if 'ExposedPorts' not in imageConfig['ContainerConfig']:
            # Image does not have any exposed ports.
            raise REST_Exception(
                f"You need to expose the port you use in the Dockerfile")
        # Get the exposed ports from the image
        exposedPorts = list(
            imageConfig['ContainerConfig']['ExposedPorts'].keys())
        # We can assign ports manually but leaving it as None means docker will assign a random available port
        assignedPorts = {k: None for k in exposedPorts}

        createdContainer = self.dockerClient.containers.run(
            image=imageTag,
            name=containerTag,
            # network="Tool-network", ## We do not need to have a network among tools.
            # Start the container on system startup
            restart_policy={"Name": "always"},
            detach=True,  # Do not listen to containers's logs, just run and leave it
            ports=assignedPorts
        )
        # Docker assings ports when we run the container, so we need to reload to get assigned ports
        createdContainer.reload()
        debugPrint(createdContainer.attrs)

        # We have the functionality to create containers with multiple ports; however, as 30 July 2021 our
        # tool system does not support multiple ports. Hence, I am just returning the first port exposed.
        ports = createdContainer.ports

        if ports.__len__() == 0:
            # Container does not have a port. I am returning none for now but we need to discuss this furrther.
            # TODO https://gitlab.com/nlpgroup1/nlp-tools-platform/-/issues/1
            return None
        print(f"{exposedPorts=} {ports=}")
        print(
            f"Created a container with port {ports[exposedPorts[0]][0]['HostPort']} ")
        return int(ports[exposedPorts[0]][0]['HostPort'])

    def restart_container(self, enum, input_dict: dict = None, token: str = None) -> bool:
        with_secret = False
        with_token = False
        if input_dict is not None and "secret" in input_dict:
            secret = input_dict['secret']
            if secret == Config.RESTART_SECRET:
                with_secret = True

        if token != None:
            is_admin = UserService().is_authorized(token=token)
            if is_admin:
                with_token = True
            else:
                from backend.backend_proxy.tool.service import ToolService

                tool: Tool = ToolService().get_tool_query(query={"enum": enum})
                user: User = UserService().get_user_query(
                    query={"token": token})
                if user != None and tool.added_by == user.username:
                    with_token = True

        if with_secret == False and with_token == False:
            return False  # You do not have permission to restart a tool

        container_name = f"{enum}-container"
        if container_name not in self.runningContainers:
            return False
        try:
            container = self.dockerClient.containers.get(container_name)
            container.restart()
            tool = self.runningContainers[container_name]
            runningContainer = self.dockerClient.containers.get(
                container_name)
            ports = runningContainer.ports
            port = int(ports[list(ports.keys())[0]][0]['HostPort'])
            tool['port'] = port
            MongoDB.getInstance().db['tool'].update_one({'_id': tool['_id']}, {
                "$set": {"port": port}})
            self.runningContainers[container_name] = tool
            return port
        except (docker.errors.NotFound, docker.errors.APIError) as e:
            return False

    def remove_container(self, container_name: str) -> bool:
        container = self.dockerClient.containers.get(container_name)
        container.remove(force=True)
