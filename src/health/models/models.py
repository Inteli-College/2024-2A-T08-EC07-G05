from sqlalchemy import Column, String, Integer, Boolean, TIMESTAMP
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class Health(Base):
    _tablename_ = "health"
    ID = Column(String, primary_key=True, index=True)
    SERVICO = Column(String)
    HEALTH = Column(String)
