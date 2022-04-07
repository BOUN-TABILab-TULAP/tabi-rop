import os
import base64
import subprocess



def get_specs_from_git(git_url) -> str: 
    dname = base64.b64encode(bytes(git_url, 'utf-8')).decode("ascii")
    dname = f"backups/{dname}"
    # check if folder exists, if so, delete it
    if not os.path.isdir("backups"):
        os.mkdir("backups")
    if os.path.isdir(dname):
        subprocess.run(["rm", "-rf", dname])
    p = subprocess.run(["git", "clone", "--depth", "1", git_url, dname])
    if p.returncode != 0:
        raise Exception("Git clone is not successfull. Check the git URL")
    # check if dip_specs folder exists
    if not os.path.isfile(f"{dname}/Dockerfile"):
        subprocess.run(["rm", "-rf", dname])
        raise Exception("Dockerfile is missing in the project's root folder.")
    toolPath = f"{dname}"
    return toolPath
