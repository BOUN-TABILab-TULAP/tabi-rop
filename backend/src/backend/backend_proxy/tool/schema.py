from marshmallow import Schema, fields

dtime_format = "%d-%m-%Y | %H:%M:%S"


class ToolSchema(Schema):
    _id = fields.Int(required=True)
    ip = fields.Str(required=True)
    port = fields.Int(required=True)
    git = fields.Str(required=True)
    name = fields.Str(required=True)
    # enum needs to be unique
    enum = fields.Str(required=True)
    update_time = fields.Str()
    contact_info = fields.Str()
    languages = fields.List(fields.String)
    domains = fields.List(fields.String)
    links = fields.List(fields.String)
    version = fields.Str(required=True)
    bibtex = fields.Str(required=True)
    doi = fields.Str(required=True)
    schema =fields.Dict(required=True)
    uiSchema =fields.Dict(required=True)
    description = fields.Str(required=True)
    usageInformation = fields.Str()
    funding = fields.Str()
    citing = fields.Str()
    inputFormats = fields.List(fields.Dict)
    outputFormats = fields.List(fields.Dict)
    endpoint = fields.Str(required=True)
