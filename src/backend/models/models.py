from sqlalchemy import Column, String, Integer, Boolean, TIMESTAMP, UUID
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class Operacao(Base):
    __tablename__ = "operacao"
    ID = Column(String, primary_key=True, index=True)
    KNR = Column(String)
    HALLE = Column(String)
    TEVE_FALHA = Column(Boolean)
    GRUPO_FALHA = Column(Integer)
    TEMPO = Column(TIMESTAMP)

class Procedimento(Base):
    __tablename__ = "procedimento"
    ID_PROCEDIMENTO = Column(String, primary_key=True, index=True)
    KNR = Column(String)
    NAME = Column(String)
    GROUP = Column(Integer)
    TEMPO = Column(TIMESTAMP)
    STATUS = Column(Boolean)

class Info(Base):
    __tablename__ = "info"
    KNR = Column(String, primary_key=True, index=True)
    COR = Column(String)
    MOTOR = Column(String)
    TEMPO_MEDIO_OPERACOES = Column(TIMESTAMP)
    RESULTADO_TESTE = Column(Boolean)
    DATA_TESTE = Column(TIMESTAMP)

class Modelo(Base):
    __tablename__ = "info"
    ID_MODELO = Column(UUID, primary_key=True, index=True)
    DATA_TREINO= Column(TIMESTAMP)
    METRICAS = Column(json)

