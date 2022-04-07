from enum import Enum


class UserType(Enum):
    standart = 1
    administrator = 2

    @staticmethod
    def strToEnum(string):
        if string not in str_enum_map:
            return UserType.standart
        return str_enum_map[string]
    
    @staticmethod
    def enumToStr(enum):
        if enum not in enum_str_map:
            return "standart"
        return enum_str_map[enum]

str_enum_map = {
    "standart": UserType.standart,
    "administrator": UserType.administrator
}

enum_str_map = {
    UserType.standart : "standart",
    UserType.administrator:"administrator"
}

