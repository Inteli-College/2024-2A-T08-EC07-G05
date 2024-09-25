import numpy as np
import pandas as pd
from fastapi import HTTPException, APIRouter, status
from supabase import Client
from datetime import datetime
from database.supabase import create_supabase_client

router = APIRouter()

def carregar_knrs():
    supabase = create_supabase_client()  # Crie a instância do cliente aqui
    
    # Busca todos os KNRs disponíveis do banco de dados
    knr_response = supabase.table('Info').select('KNR').execute()
    
    # Verifica se houve erro na resposta
    knr_response_json = knr_response.json()
    if 'error' in knr_response_json:
        raise HTTPException(status_code=500, detail=f"Erro ao buscar KNRs: {knr_response_json['error']}")

    # Lista de KNRs
    knr_list = knr_response.data
    knrs = [item['KNR'] for item in knr_list]
    
    # Inicializa uma lista para armazenar as features de cada KNR
    knr_features = []

    # Itera sobre cada KNR para coletar e preparar as informações
    for knr in knrs:
        # Carrega os dados relacionados ao KNR específico
        operacoes_response = supabase.rpc('get_operacoes', {'knr': knr}).execute()
        response_json = operacoes_response.json()
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

        # Prepara as features
        features = [
            int(operacoes_dict.get('AGUA', 0)), int(operacoes_dict.get('BUY', 0)), int(operacoes_dict.get('CAB', 0)),
            int(operacoes_dict.get('DKA', 0)), int(operacoes_dict.get('ESPC', 0)), int(operacoes_dict.get('PROC', 0)),
            int(operacoes_dict.get('PVC', 0)), int(operacoes_dict.get('RUID', 0)), int(operacoes_dict.get('ZP5', 0)),
            int(operacoes_dict.get('ZP5A', 0)), int(operacoes_dict.get('ZP6', 0)), int(operacoes_dict.get('ZP61', 0)),
            int(operacoes_dict.get('ZP62', 0)), int(operacoes_dict.get('ZP7', 0)), int(operacoes_dict.get('ZP8', 0)),
            int(operacoes_dict.get('ZP8R', 0)), int(operacoes_dict.get('SEM_HALLE', 0)),
            int(procedimentos_dict.get((1, True), 0)), int(procedimentos_dict.get((1, False), 0)),
            int(procedimentos_dict.get((2, True), 0)), int(procedimentos_dict.get((2, False), 0)),
            int(procedimentos_dict.get((718, True), 0)), int(procedimentos_dict.get((718, False), 0)),
            tempo_medio,
            1 if info['COR'] == '0QA1' else 0, 1 if info['COR'] == '2R2R' else 0, 1 if info['COR'] == '2RA1' else 0,
            1 if info['COR'] == '5T5T' else 0, 1 if info['COR'] == '6K6K' else 0, 1 if info['COR'] == '6KA1' else 0,
            1 if info['COR'] == '6UA1' else 0, 1 if info['COR'] == 'A1A1' else 0, 1 if info['COR'] == 'K2A1' else 0,
            1 if info['COR'] == 'K2K2' else 0, 1 if info['MOTOR'] == 'CWS' else 0, 1 if info['MOTOR'] == 'DHS' else 0,
            1 if info['MOTOR'] == 'DRP' else 0
        ]

        # Adiciona as features deste KNR à lista
        knr_features.append(features)

    # Converte a lista de features em um DataFrame para facilitar o manuseio posterior
    features_df = pd.DataFrame(knr_features)
    
    # Retorna os dados como uma lista de dicionários
    return features_df.astype(object).to_dict(orient='records')