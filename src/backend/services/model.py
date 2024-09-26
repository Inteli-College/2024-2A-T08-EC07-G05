from database.supabase import insert_table, get_by_id
from utils.parser import parse_halle_times
from datetime import datetime


def get_model_by_id():
    data = get_by_id('Modelo', 'ID_MODELO,DATA_TREINO,PRECISAO')
    print(data)
    # for entry in data:
    #     id = entry['ID_MODELO']
    #     entry['DATA_TREINO'] = {item['ID_MODELO']: item['DATA_TREINO'] for item in data}.get(id, None)
    #     entry['PRECISAO'] = {item['ID_MODELO']: item['PRECISAO'] for item in data}.get(id, None)
    return data


def create_model_by_id(precisao: float):
    data = insert_table('Modelo', {"DATA_TREINO": datetime.now, "PRECISAO": precisao})
    parsed_data = parse_halle_times(data)
    print(data)
    for entry in parsed_data:
        id = entry['ID_MODELO']
        entry['DATA_TREINO'] = {item['ID_MODELO']: item['DATA_TREINO'] for item in data}.get(id, None)
        entry['PRECISAO'] = {item['ID_MODELO']: item['PRECISAO'] for item in data}.get(id, None)
    return parsed_data
