from marshmallow import Schema, fields, post_load


import bson
from marshmallow import ValidationError, fields, missing

from backend.backend_proxy.user.user_class import User


class ObjectId(fields.Field):
    def _deserialize(self, value, attr, data, **kwargs):
        try:
            return bson.ObjectId(value)
        except Exception:
            raise ValidationError("invalid ObjectId `%s`" % value)

    def _serialize(self, value, attr, obj):
        if value is None:
            return missing
        return str(value)


class UserSchema(Schema):
    _id = ObjectId()
    username = fields.String(required=True)
    email = fields.Email(required=True)
    password = fields.String(required=True)
    registered_at = fields.DateTime(required=True)
    last_seen_at = fields.DateTime()
    type_enum = fields.String(required=True)
    token = fields.String()

    @post_load
    def create_object(self, data, **kwargs):
        return User(data)
