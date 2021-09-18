
def createUiSchema(inputList):
    schema = {
        "title": "Demo",
        "type": "object",   
        "id":"$root",
        "properties": {
        
        }
    }
    uiSchema = {}
    for inputIndex in range(len(inputList)):
        schema["properties"][f"input_{inputIndex}"] = {
            "type": "string",
            "title": inputList[inputIndex]['data_type'],
            "id":f"$root/properties/input_{inputIndex}",
            "$componentType":"textArea",
            "$defaultValue":inputList[inputIndex]['example']
        }
        # uiSchema[f"input_{inputIndex}"] = {
        #     "ui:widget": "textarea",
        #     "ui:emptyValue": inputList[inputIndex]['data_type']
        # }

    return schema, uiSchema
