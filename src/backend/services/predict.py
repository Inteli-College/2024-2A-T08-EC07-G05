import numpy as np
import pandas as pd 
import pickle
from fastapi import HTTPException
from models.models import Operacao, Procedimento, Info
from supabase import Client
from datetime import datetime


with open("utils/modelo.pkl", "rb") as f:
    model = pickle.load(f)

#falta a conexão com o banco de dados
def prediction(knr: str = None, supabase = Client):

    operacoes_response = supabase.rpc('get_operacoes', {'knr': knr}).execute()

    # Convert the response to JSON to check for errors
    response_json = operacoes_response.json()

    # Check if there is an error in the response
    if 'error' in response_json:
        raise HTTPException(status_code=500, detail=f"Error fetching data from Operacao: {response_json['error']}")

    # Access the data if there is no error
    operacoes = operacoes_response.data
    operacoes_dict = {op["halle"]: op["qtd_falhas"] for op in operacoes}

    # Call the custom function to get grouped results
    procedimentos_response = supabase.rpc('get_procedimentos_grouped', {'knr': knr}).execute()

    # Convert the response to JSON to check for errors
    response_json = procedimentos_response.json()

    # Check if there is an error in the response
    if 'error' in response_json:
        raise HTTPException(status_code=500, detail=f"Error fetching data from Procedimento: {response_json['error']}")

    # Process the data if there is no error
    procedimentos = procedimentos_response.data
    procedimentos_dict = {(proc["grp"], proc["status"]): proc["qtd_status"] for proc in procedimentos}

    # Call the custom function to get min and max tempo
    tempo_response = supabase.rpc('get_min_max_tempo', {'knr': knr}).execute()

    # Convert the response to JSON to check for errors
    response_json = tempo_response.json()

    # Check if there is an error in the response
    if 'error' in response_json:
        raise HTTPException(status_code=500, detail=f"Error fetching tempo data from Procedimento: {response_json['error']}")

    tempos = tempo_response.data[0]
    
    # Safely convert to datetime objects and handle None values
    min_tempo = datetime.fromisoformat(tempos["min_tempo"]) if tempos["min_tempo"] else None
    max_tempo = datetime.fromisoformat(tempos["max_tempo"]) if tempos["max_tempo"] else None

    # Calculate tempo_medio, handle None values
    if min_tempo and max_tempo:
        tempo_medio = (max_tempo - min_tempo).total_seconds()
    else:
        tempo_medio = 0

    # Fetch data from Info table
    info_response = supabase.table("Info").select("*").eq("KNR", knr).single().execute()

    # Convert the response to JSON to check for errors
    response_json = info_response.json()

    # Check if there is an error in the response
    if 'error' in response_json:
        raise HTTPException(status_code=404, detail=f"Error fetching data from Info: {response_json['error']}")

    # Access the data if there is no error
    info = info_response.data


    # Preparo o vetor das features para o modelo
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

    print(f' Features: {features}')

    features_array = np.array([features])
    prediction_result = model.predict(features_array)

    # Convert numpy types to native Python types
    prediction_value = prediction_result[0].item()  # Convert numpy.int64 to Python int

    return {"prediction": prediction_value}