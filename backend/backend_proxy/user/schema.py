from marshmallow import Schema, fields


class UserSchema(Schema):
    _id = fields.Int(required=True)
    username = fields.String(required=True)
    email = fields.Email(required=True)
    password = fields.String(required=True)
    roles = fields.List(fields.String(), required=True)
    # list of enum of tools that the user has access to
    tools = fields.List(fields.String(), required=True)
    registered_at = fields.DateTime(required=True)
    last_seen_at = fields.DateTime(required=True)
