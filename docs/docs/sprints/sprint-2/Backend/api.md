---
title: API
sidebar_position: 3
slug: "/api_modelo"
---

# Documentação do Backend

## Introdução

Este projeto utiliza um backend construído com FastAPI que se conecta a um banco de dados gerenciado pelo Supabase. O objetivo do sistema é fornecer previsões baseadas em dados de operações e procedimentos de veículos específicos, utilizando um modelo de machine learning. O modelo é alimentado por diversas características extraídas e tratadas diretamente no banco de dados, garantindo uma integração eficiente e performática entre as consultas SQL e a lógica de previsão.

A arquitetura do backend inclui rotas para interagir com o modelo de previsão, enquanto as funções SQL customizadas no banco de dados tratam e agregam os dados necessários, minimizando a carga no backend e otimizando o tempo de resposta.

## Roteamento do Backend

### Arquivo `routes.py`

O arquivo `routes.py` é a espinha dorsal do sistema de roteamento do nosso backend. Ele centraliza e organiza todas as rotas da aplicação, garantindo que cada módulo específico de funcionalidade (como usuários, logs, mídias, robôs e websockets) tenha seu próprio roteador, o que facilita a manutenção e a escalabilidade do código.

**Estrutura e Funcionalidade:**

```python
from fastapi import APIRouter
from routes.logs import router as logs_router
from routes.medias import router as medias_router
from routes.robots import router as robots_router
from routes.users import router as users_router
from routes.websocket import router as websocket_router

router = APIRouter()

router.include_router(users_router)
router.include_router(logs_router)
router.include_router(medias_router)
router.include_router(robots_router)
router.include_router(websocket_router)
Para conectar as rotas de cada schema ao nosso arquivo routes.py, usamos um trecho específico de código em cada arquivo da pasta routes, que define o prefixo e tags para rotas. Aqui, por exemplo, estamos utilizando o prefixo de logs:

router = APIRouter(
    prefix="/logs",
    tags=["logs"],
)
```

Ao organizar as rotas dessa maneira, conseguimos modularizar nosso código, melhorando a clareza e a manutenção. Cada módulo pode ser desenvolvido e testado separadamente, e qualquer mudança ou adição de novas rotas pode ser feita sem impactar diretamente outras partes da aplicação. O uso de APIRouter do FastAPI nos permite criar um sistema de roteamento robusto e eficiente, adequado para aplicações de médio e grande porte.

### Arquivo `main.py`
Este arquivo é responsável pela inicialização do FastAPI e configuração das rotas e middlewares, garantindo que a aplicação esteja configurada corretamente para receber requisições.

Código:

```python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import predict

app = FastAPI()

app.include_router(predict.router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "working"}

```

### Arquivo `routers.py`
Este arquivo define as rotas específicas para a previsão baseada no KNR, integrando o Supabase como o serviço de backend de dados.

Código:

```python
from fastapi import APIRouter, HTTPException, Depends
from services.predict import prediction
from schemas.schemas import KNRInput
from supabase import Client
from database.supabase import create_supabase_client

router = APIRouter(tags=["predict"])

def get_supabase_client() -> Client:
    return create_supabase_client()

@router.post("/predict/")
async def predict_knr(data: KNRInput, supabase: Client = Depends(get_supabase_client)):
    knr = data.knr
    my_prediction = prediction(knr=knr, supabase=supabase)
    return my_prediction
```

### Arquivo `schemas.py`
Define a estrutura dos dados esperados para a previsão, garantindo a validação e serialização dos dados no FastAPI.

Código:

```python
from pydantic import BaseModel

class KNRInput(BaseModel):
    knr: str
```

## Conexão com o Banco de Dados
A conexão com o Supabase é gerenciada através da função `create_supabase_client`, que utiliza as credenciais armazenadas em variáveis de ambiente para estabelecer a comunicação com o serviço de backend de dados.

Código:

```python
from supabase import Client, create_client
import os
import tempfile
from dotenv import load_dotenv, find_dotenv

load_dotenv(find_dotenv())

api_url: str = os.getenv("SUPABASE_URL")
key: str = os.getenv("SUPABASE_KEY")

def create_supabase_client():
    supabase: Client = create_client(api_url, key)
    return supabase

```

## Lógica de Previsão do Modelo
### Funcionalidade do Serviço de Previsão
A função de previsão está implementada no arquivo `services/predict.py`. O modelo de machine learning é carregado a partir de um arquivo pickle, e o backend se conecta ao Supabase para realizar queries que alimentam as previsões. A lógica segue os seguintes passos:

### Consulta ao Banco de Dados:

A função prediction utiliza RPCs (Remote Procedure Calls) definidas no Supabase para recuperar dados específicos relacionados ao veículo, como falhas operacionais, procedimentos agrupados e tempos mínimos e máximos.

### Tratamento de Dados:

Os resultados das consultas são processados para extrair as características relevantes, como o número de falhas em diferentes operações (operacoes_dict), contagem de procedimentos agrupados por grupo e status (procedimentos_dict), e cálculo do tempo médio (tempo_medio) entre o primeiro e o último procedimento realizado.

### Preparo das Features para o Modelo:

Com os dados tratados, é criado um vetor de features que inclui contagens de falhas, procedimentos, e características do veículo, como cor e tipo de motor. Esse vetor é utilizado como input para o modelo de previsão.

### Previsão do Modelo:

O modelo faz uma previsão com base no vetor de features preparado, e o resultado é retornado como uma resposta JSON que inclui a previsão e algumas características do veículo.

### Código da Função de Previsão

```python
import numpy as np
import pandas as pd 
import pickle
from fastapi import HTTPException
from supabase import Client
from datetime import datetime

with open("utils/modelo.pkl", "rb") as f:
    model = pickle.load(f)

def prediction(knr: str = None, supabase = Client):

    # Fetch operational data using custom SQL function
    operacoes_response = supabase.rpc('get_operacoes', {'knr': knr}).execute()
    response_json = operacoes_response.json()
    if 'error' in response_json:
        raise HTTPException(status_code=500, detail=f"Error fetching data from Operacao: {response_json['error']}")
    operacoes = operacoes_response.data
    operacoes_dict = {op["halle"]: op["qtd_falhas"] for op in operacoes}

    # Fetch grouped procedural data using another SQL function
    procedimentos_response = supabase.rpc('get_procedimentos_grouped', {'knr': knr}).execute()
    response_json = procedimentos_response.json()
    if 'error' in response_json:
        raise HTTPException(status_code=500, detail=f"Error fetching data from Procedimento: {response_json['error']}")
    procedimentos = procedimentos_response.data
    procedimentos_dict = {(proc["grp"], proc["status"]): proc["qtd_status"] for proc in procedimentos}

    # Fetch min and max procedural times
    tempo_response = supabase.rpc('get_min_max_tempo', {'knr': knr}).execute()
    response_json = tempo_response.json()
    if 'error' in response_json:
        raise HTTPException(status_code=500, detail=f"Error fetching tempo data from Procedimento: {response_json['error']}")
    tempos = tempo_response.data[0]
    min_tempo = datetime.fromisoformat(tempos["min_tempo"]) if tempos["min_tempo"] else None
    max_tempo = datetime.fromisoformat(tempos["max_tempo"]) if tempos["max_tempo"] else None
    tempo_medio = (max_tempo - min_tempo).total_seconds() if min_tempo and max_tempo else 0

    # Fetch vehicle info from the Info table
    info_response = supabase.table("Info").select("*").eq("KNR", knr).single().execute()
    response_json = info_response.json()
    if 'error' in response_json:
        raise HTTPException(status_code=404, detail=f"Error fetching data from Info: {response_json['error']}")
    info = info_response.data

    # Prepare the feature vector for the model
    features = [
        operacoes_dict.get('AGUA', 0), operacoes_dict.get('BUY', 0), operacoes_dict.get('CAB', 0),
        operacoes_dict.get('DKA', 0), operacoes_dict.get('ESPC', 0), operacoes_dict.get('PROC', 0),
        operacoes_dict.get('PVC', 0), operacoes_dict.get('RUID', 0), operacoes_dict.get('ZP5', 0),
        operacoes_dict.get('ZP5A', 0), operacoes_dict.get('ZP6', 0), operacoes_dict.get('ZP61', 0),
        operacoes_dict.get('ZP62', 0), operacoes_dict.get('ZP7', 0), operacoes_dict.get('ZP8', 0),
        operacoes_dict.get('ZP8R', 0), operacoes_dict.get('SEM_HALLE', 0),
        procedimentos_dict.get((1, True), 0), procedimentos_dict.get((1, False), 0),
        procedimentos_dict.get((2, True), 0), procedimentos_dict.get((2, False), 0),
        procedimentos_dict.get((718, True), 0), procedimentos_dict.get((718, False), 0),
        tempo_medio,
        1 if info['COR'] == '0QA1' else 0, 1 if info['COR'] == '2R2R' else 0, 1 if info['COR'] == '2RA1' else 0,
        1 if info['COR'] == '5T5T' else 0, 1 if info['COR'] == '6K6K' else 0, 1 if info['COR'] == '6KA1' else 0,
        1 if info['COR'] == '6UA1' else 0, 1 if info['COR'] == 'A1A1' else 0, 1 if info['COR'] == 'K2A1' else 0,
        1 if info['COR'] == 'K2K2' else 0, 1 if info['MOTOR'] == 'CWS' else 0, 1 if info['MOTOR'] == 'DHS' else 0,
        1 if info['MOTOR'] == 'DRP' else 0
    ]

    features_array = np.array([features])
    prediction_result = model.predict(features_array)
    prediction_value = prediction_result[0].item()

    return {"prediction": prediction_value, "cor": info['COR'], "motor": info['MOTOR']}
    ```

