from backend.backend_proxy.tool.formats.formatAbstractClass import Format


class ListOfListOfMorphFeatList(Format):
    def __init__(self,enum) -> None:
        super().__init__()
        self.enum = enum

    def toString(self, text) -> str:
        output = []
        sentences = text.split(
            "--------------------------------------------------")

        for sentence in sentences:
            if sentence == "":
                continue
            tokens = sentence.split("\n")
            lastkey = ""
            for token in tokens:
                if not token.startswith("\t"):
                    if(lastkey != ""):
                        output.append({lastkey: findings})
                    lastkey = token.strip()
                    findings = []
                else:
                    findings.append(token.strip())
        return str(output).replace("'",'"')
    
    def fromString(self, text) -> str:
        return text
