import numpy as np
import pandas as pd
from fastapi import HTTPException, APIRouter, status
from supabase import Client
from datetime import datetime
from database.supabase import create_supabase_client

router = APIRouter()

def carregar_knrs():
    supabase = create_supabase_client() 
    
    knr_response = supabase.table('Info').select('KNR').execute()
    
    knr_response_json = knr_response.json()
    if 'error' in knr_response_json:
        raise HTTPException(status_code=500, detail=f"Erro ao buscar KNRs: {knr_response_json['error']}")

    knr_list = knr_response.data
    knrs = [item['KNR'] for item in knr_list]
    
    knr_features = []

    for knr in knrs:
        operacoes_response = supabase.rpc('get_operacoes', {'knr': knr}).execute()
        response_json = operacoes_response.json()
        print(operacoes_response)
        if 'error' in response_json:
            raise HTTPException(status_code=500, detail=f"Erro ao buscar dados de Operacao: {response_json['error']}")
        operacoes = operacoes_response.data
        operacoes_dict = {op["halle"]: op["qtd_falhas"] for op in operacoes}

        procedimentos_response = supabase.rpc('get_procedimentos_grouped', {'knr': knr}).execute()
        response_json = procedimentos_response.json()
        if 'error' in response_json:
            raise HTTPException(status_code=500, detail=f"Erro ao buscar dados de Procedimento: {response_json['error']}")
        procedimentos = procedimentos_response.data
        procedimentos_dict = {(proc["grp"], proc["status"]): proc["qtd_status"] for proc in procedimentos}

        tempo_response = supabase.rpc('get_min_max_tempo', {'knr': knr}).execute()
        response_json = tempo_response.json()
        if 'error' in response_json:
            raise HTTPException(status_code=500, detail=f"Erro ao buscar tempo: {response_json['error']}")
        tempos = tempo_response.data[0]
        
        min_tempo = datetime.fromisoformat(tempos["min_tempo"]) if tempos["min_tempo"] else None
        max_tempo = datetime.fromisoformat(tempos["max_tempo"]) if tempos["max_tempo"] else None
        tempo_medio = (max_tempo - min_tempo).total_seconds() if min_tempo and max_tempo else 0

        info_response = supabase.table("Info").select("*").eq("KNR", knr).single().execute()
        response_json = info_response.json()
        if 'error' in response_json:
            raise HTTPException(status_code=404, detail=f"Erro ao buscar dados de Info: {response_json['error']}")
        info = info_response.data

        # Prepara as features com os nomes das colunas conforme solicitado
        features = {
            'QTD_HALLE_': int(operacoes_dict.get('HALLE', 0)),
            'QTD_HALLE_AGUA': int(operacoes_dict.get('AGUA', 0)),
            'QTD_HALLE_BUY': int(operacoes_dict.get('BUY', 0)),
            'QTD_HALLE_CAB': int(operacoes_dict.get('CAB', 0)),
            'QTD_HALLE_DKA': int(operacoes_dict.get('DKA', 0)),
            'QTD_HALLE_ESPC': int(operacoes_dict.get('ESPC', 0)),
            'QTD_HALLE_PROC': int(operacoes_dict.get('PROC', 0)),
            'QTD_HALLE_PROF': int(operacoes_dict.get('PROF', 0)),
            'QTD_HALLE_PVC': int(operacoes_dict.get('PVC', 0)),
            'QTD_HALLE_ROD': int(operacoes_dict.get('ROD', 0)),
            'QTD_HALLE_RUID': int(operacoes_dict.get('RUID', 0)),
            'QTD_HALLE_TLUI': int(operacoes_dict.get('TLUI', 0)),
            'QTD_HALLE_ZP5': int(operacoes_dict.get('ZP5', 0)),
            'QTD_HALLE_ZP5A': int(operacoes_dict.get('ZP5A', 0)),
            'QTD_HALLE_ZP6': int(operacoes_dict.get('ZP6', 0)),
            'QTD_HALLE_ZP61': int(operacoes_dict.get('ZP61', 0)),
            'QTD_HALLE_ZP62': int(operacoes_dict.get('ZP62', 0)),
            'QTD_HALLE_ZP7': int(operacoes_dict.get('ZP7', 0)),
            'QTD_HALLE_ZP8': int(operacoes_dict.get('ZP8', 0)),
            'QTD_HALLE_ZP82': int(operacoes_dict.get('ZP82', 0)),
            'QTD_HALLE_ZP8R': int(operacoes_dict.get('ZP8R', 0)),
            'QTD_SGROUP_#MULTIVALUE': int(operacoes_dict.get('#MULTIVALUE', 0)),
            'QTD_SGROUP_-2': int(operacoes_dict.get('-2', 0)),
            'QTD_SGROUP_1': int(operacoes_dict.get('1', 0)),
            'QTD_SGROUP_133': int(operacoes_dict.get('133', 0)),
            'QTD_SGROUP_137': int(operacoes_dict.get('137', 0)),
            'QTD_SGROUP_140': int(operacoes_dict.get('140', 0)),
            'QTD_SGROUP_2': int(operacoes_dict.get('2', 0)),
            'QTD_SGROUP_4': int(operacoes_dict.get('4', 0)),
            'QTD_SGROUP_5': int(operacoes_dict.get('5', 0)),
            'QTD_SGROUP_9830946': int(operacoes_dict.get('9830946', 0)),
            'TEM_FALHA_ROD': 0,  
            'COR_0QA1': 1 if info['COR'] == '0QA1' else 0,
            'COR_2R2R': 1 if info['COR'] == '2R2R' else 0,
            'COR_2RA1': 1 if info['COR'] == '2RA1' else 0,
            'COR_5T5T': 1 if info['COR'] == '5T5T' else 0,
            'COR_5TA1': 1 if info['COR'] == '5TA1' else 0,
            'COR_6K6K': 1 if info['COR'] == '6K6K' else 0,
            'COR_6KA1': 1 if info['COR'] == '6KA1' else 0,
            'COR_6UA1': 1 if info['COR'] == '6UA1' else 0,
            'COR_A1A1': 1 if info['COR'] == 'A1A1' else 0,
            'COR_K2A1': 1 if info['COR'] == 'K2A1' else 0,
            'COR_K2K2': 1 if info['COR'] == 'K2K2' else 0,
            'COR_O7O7': 1 if info['COR'] == 'O7O7' else 0,
            'MOTOR_CWS': 1 if info['MOTOR'] == 'CWS' else 0,
            'MOTOR_DHS': 1 if info['MOTOR'] == 'DHS' else 0,
            'MOTOR_DRP': 1 if info['MOTOR'] == 'DRP' else 0
        }

        knr_features.append(features)

    features_df = pd.DataFrame(knr_features)
    
    return features_df.astype(object).to_dict(orient='records')
