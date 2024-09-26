from database.supabase import insert_table, get_by_id
from utils.parser import parse_halle_times
from datetime import datetime


def get_model_by_id():
    data = get_by_id('Modelo', 'ID_MODELO,DATA_TREINO,PRECISAO')

    # PEGAR NO BICKET DO SUPABASE O ARQUIVO PKL CUJO ID É DATA.ID_BUCKET
    # RETORNAR ARQUIVO PKL 
    print(data)
    # for entry in data:
    #     id = entry['ID_MODELO']
    #     entry['DATA_TREINO'] = {item['ID_MODELO']: item['DATA_TREINO'] for item in data}.get(id, None)
    #     entry['PRECISAO'] = {item['ID_MODELO']: item['PRECISAO'] for item in data}.get(id, None)
    return data


def create_model_by_id(precisao: float):
    ## add o parametro do modelo (pkl) e data
    # função que insere o pkl no bucket e retorna o id do bucket
    # insere as metricas + id do bucket na tabela do supabase
    data = insert_table('Modelo', {"DATA_TREINO": datetime.now, "PRECISAO": precisao})
    parsed_data = parse_halle_times(data)
    print(data)
    for entry in parsed_data:
        id = entry['ID_MODELO']
        entry['DATA_TREINO'] = {item['ID_MODELO']: item['DATA_TREINO'] for item in data}.get(id, None)
        entry['PRECISAO'] = {item['ID_MODELO']: item['PRECISAO'] for item in data}.get(id, None)
    return parsed_data
