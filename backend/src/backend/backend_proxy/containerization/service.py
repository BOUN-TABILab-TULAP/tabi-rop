from backend.backend_proxy.api.exception import REST_Exception
from os import name, path, stat
import docker
from docker.api import container, image
from docker.errors import NotFound
from backend.backend_proxy.db.mongoDB import MongoDB
from backend.backend_proxy.db.mongoDB import MongoConn
# from backend.app import debugPrint
import sys
def debugPrint(*args, **kwargs):
    print(*args, file=sys.stderr, **kwargs)

# This class is a singleton. Please use getInstance() instead of  __init__.
class DockerService:
    __instance = None

    @staticmethod
    def getInstance():
        """ Static access method. """
        if DockerService.__instance == None:
            DockerService.__instance = DockerService()
        return DockerService.__instance

    def __init__(self) -> None:
        if DockerService.__instance != None:
            raise Exception(
                "This class is a singleton! Please use the getInstance function")
        self.dockerClient = docker.from_env()
        self.runningContainers = []
        cn = MongoConn()
        self.db = MongoDB(cn, "tools")
        existingTools = list(self.db.find_all())
        debugPrint(f"Found {len(existingTools)} existing tools")
        for tool in existingTools:
            container_name = f"{tool['enum']}_{tool['version']}-container"
            debugPrint(container_name)
            try:
                runningContainer = self.dockerClient.containers.get(
                    f"{tool['enum']}_{tool['version']}-container")
                ports = runningContainer.ports
                port = int(ports[list(ports.keys())[0]][0]['HostPort'])
                tool['port'] = port
                self.db.db['tools'].update_one({u'_id': tool['_id']}, {"$set": {"port": port}})
            except NotFound as e:  # Tool is registered to the database but does not exist in docker
                debugPrint(e)
                # TODO(Muhammet) What to do when container cannot be found
                pass
            except IndexError as indexError:
                debugPrint(f"{container_name} does not have a port!")
                pass


    # Takes a dockerfile, enum and the version of the tool, creates an image, runs a container and returns the port of the container.
    # path_dockerfile: Path of the Dockerfile
    # name_enum: Enum of the tool, for naming the image and container
    # version: version of the tool

    def create_new_container(self, dockerfilePath: str, nameEnum: str, version: str) -> int:
        naming = f"{nameEnum}_{version}"
        imageTag = naming + "-image"
        containerTag = naming + "-container"
        debugPrint(f"Creating a new container with {containerTag}")

        createdImage = self.dockerClient.images.build(
            path=f"/app/{dockerfilePath}",
            dockerfile=f"/app/{dockerfilePath}/dip_specs/Dockerfile",
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
            restart_policy={"Name": "always"}, ## Start the container on system startup
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
        print(
            f"Created a container with port {ports[exposedPorts[0]][0]['HostPort']} ")
        return int(ports[exposedPorts[0]][0]['HostPort'])
