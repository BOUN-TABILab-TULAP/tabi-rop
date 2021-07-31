from os import name, path
import docker
from docker.api import container, image


class DockerService:
    def __init__(self) -> None:
        self.dockerClient = docker.from_env()

    # Takes a dockerfile, enum and the version of the tool, creates an image, runs a container and returns the port of the container.
    # path_dockerfile: Path of the Dockerfile
    # name_enum: Enum of the tool, for naming the image and container
    # version: version of the tool
    def create_new_container(self, path_dockerfile: str, name_enum: str, version: str) -> int:
        naming = f"{name_enum}_{version}"
        imageTag = naming + "-image"
        containerTag = naming + "-container"

        createdImage = self.dockerClient.images.build(
            path=f"/app/{path_dockerfile}",
            dockerfile=f"/app/{path_dockerfile}/dip_specs/Dockerfile",
            tag=imageTag)
        imageConfig = createdImage[0].attrs

        exposedPorts = list(
            imageConfig['ContainerConfig']['ExposedPorts'].keys())
        assignedPorts = {k: None for k in exposedPorts}

        createdContainer = self.dockerClient.containers.run(
            image=imageTag,
            name=containerTag,
            # network="Tool-network",
            detach=True,
            ports=assignedPorts)
        createdContainer.reload() # Get the new attrs from dockerCLient

        # We have the functionality to create containers with multiple ports; however, as 30 July 2021 our
        # tool system does not support multiple ports. Hence, I am just returning the first port exposed.
        ports = createdContainer.ports
        if ports.__len__() == 0:
            #TODO Handle
            pass
        print(f"Created a container with port {ports[exposedPorts[0]][0]['HostPort']} ")
        return int(ports[exposedPorts[0]][0]['HostPort'])

