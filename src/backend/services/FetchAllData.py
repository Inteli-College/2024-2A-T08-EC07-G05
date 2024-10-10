import numpy as np
import pandas as pd
from fastapi import HTTPException, APIRouter, status
from supabase import Client
from datetime import datetime
from database.supabase import create_supabase_client

router = APIRouter()

def transform_data(data):
    coluna_especifica = "TEM_FALHA_ROD"
    transformed_data = []
    
    for item in data:
        new_item = {}
        for index, (key, value) in enumerate(item.items()):
            if key == coluna_especifica:
                new_item[key] = value  # Mantém o nome da coluna
            else:
                new_item[index] = value  # Enumera as outras colunas
        transformed_data.append(new_item)

    return transformed_data

def transform_data_predict(data):
    coluna_especifica = "TEM_FALHA_ROD"
    transformed_data = []
    
    for item in data:
        new_item = {}
        for index, (key, value) in enumerate(item.items()):
            if key == coluna_especifica:
                #remove registro tem falha rod
                continue
            else:
                new_item[index] = value  # Enumera as outras colunas
        transformed_data.append(new_item)

    return transformed_data


def carregar_knrs():
    supabase = create_supabase_client() 
    
    # Fazendo a consulta na tabela ETL
    response = supabase.table('ETL').select('*').execute()
    response_json = response.json()

    # Verificando se ocorreu algum erro na consulta
    if 'error' in response_json:
        raise HTTPException(status_code=500, detail=f"Erro ao buscar dados: {response_json['error']}")

    # Coletando os dados
    data_list = response.data

    # Verificando se há dados retornados
    if not data_list:
        raise HTTPException(status_code=404, detail="Nenhum dado encontrado na tabela ETL")

    # Transformando os dados em DataFrame para facilitar o processamento
    data_df = pd.DataFrame(data_list)

    # Aqui você pode aplicar qualquer normalização adicional necessária para sua pipeline
    # Exemplo de processamento: Convertendo tudo para valores numéricos ou categóricos
    normalized_data_df = data_df.apply(pd.to_numeric, errors='coerce').fillna(0)

    # Convertendo de volta para um array de dicionários
    normalized_data_array = normalized_data_df.astype(object).to_dict(orient='records')

    # Aplicando a transformação nos dados normalizados
    transformed_data = transform_data(normalized_data_array)

    # Exibindo os dados transformados
    return transformed_data

def carregar_knr(knr):
    supabase = create_supabase_client() 
    
    # Fazendo a consulta na tabela ETL
    response = supabase.table('ETL').select('*').eq('KNR', knr).execute()
    response_json = response.json()

    # Verificando se ocorreu algum erro na consulta
    if 'error' in response_json:
        raise HTTPException(status_code=500, detail=f"Erro ao buscar dados: {response_json['error']}")

    # Coletando os dados
    data_list = response.data

    # Verificando se há dados retornados
    if not data_list:
        raise HTTPException(status_code=404, detail=f"Nenhum dado encontrado para o KNR {knr}")

    # Transformando os dados em DataFrame para facilitar o processamento
    data_df = pd.DataFrame(data_list)

    # Aqui você pode aplicar qualquer normalização adicional necessária para sua pipeline
    # Exemplo de processamento: Convertendo tudo para valores numéricos ou categóricos
    normalized_data_df = data_df.apply(pd.to_numeric, errors='coerce').fillna(0)

    # Convertendo de volta para um array de dicionários
    normalized_data_array = normalized_data_df.astype(object).to_dict(orient='records')

    # Aplicando a transformação nos dados normalizados
    transformed_data = transform_data_predict(normalized_data_array)

    return transformed_data