from pydantic import BaseModel

class LOGSInput(BaseModel):
    servico: str
    health: str
    date: str
