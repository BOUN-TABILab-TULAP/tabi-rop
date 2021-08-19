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
    author_json = fields.Dict(required=True)
    root_json = fields.Dict(required=True)
    contact_json = fields.Str()
    form_data_json = fields.Dict(required=True)
    update_time = fields.DateTime(format=dtime_format)
    contact_info = fields.Str()
    version = fields.Str(required=True)
