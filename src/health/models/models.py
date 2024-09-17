from sqlalchemy import Column, String, TIMESTAMP, func
from sqlalchemy.ext.declarative import declarative_base
from datetime import datetime
import pytz

Base = declarative_base()

class Health(Base):
    __tablename__ = "health"  

    ID = Column(String, primary_key=True, index=True)
    SERVICO = Column(String)
    HEALTH = Column(String)
    DATE = Column(String)