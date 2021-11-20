import json
def get_config(field, filename="config.json"):
    with open(filename,"r") as f:
        configObject = json.load(f)
        f.close()
    if field not in configObject:
        raise KeyError
    return configObject[field]