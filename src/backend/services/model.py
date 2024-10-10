
from database.supabase import insert_table, get_by_id, save_model_to_bucket, get_model_from_bucket, delete_model_from_bucket, delete_model_from_table, get_models_from_table, get_current_model_from_table, delete_current_model_from_table
from utils.parser import parse_halle_times
from database.supabase import insert_table, get_by_id, save_model_to_bucket, get_model_from_bucket
import os
from datetime import datetime
import numpy as np
import pandas as pd
import pickle
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report, accuracy_score
from sklearn.metrics import precision_score, recall_score, f1_score
from imblearn.over_sampling import SMOTE
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import LSTM, Dense, Dropout
from tensorflow.keras.optimizers import Adam
import asyncio
import os
import httpx


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

def get_model_by_id(id):
    data = get_by_id('Modelo', 'ID_MODELO, URL_BUCKET', id)
    if data is not None:
        filename = data[0]['URL_BUCKET']
        print("filename: ", filename)
        model = get_model_from_bucket(filename, "modelos-it-cross")
        if model is None:
            return {"error": "Erro ao buscar o modelo no bucket."}

    print(data)
    return model

def get_models():
    data = get_models_from_table()
    return data

def get_current_model():
    data = get_current_model_from_table()
    if data is not None:
        return data
    
def update_current_model_by_id(ID_NOVO_MODELO):
    try:
        new_model = get_by_id('Modelo', '*', ID_NOVO_MODELO)
        print(new_model)
        if new_model is not None:
            print("new_model data: ", new_model[0])
            new_model_added = insert_table('Modelo_atual', {
                "ID_MODELO_ATUAL": ID_NOVO_MODELO,
                "URL_BUCKET": new_model[0]["URL_BUCKET"],
                "DATA_TREINO": new_model[0]["DATA_TREINO"],
                "ACURACIA": new_model[0]["ACURACIA"],
                "PRECISAO": new_model[0]["PRECISAO"],
                "RECALL": new_model[0]["RECALL"],
                "F1": new_model[0]["F1"]})
        if new_model_added is not None:
            return new_model_added
    except Exception as e:
        print(e)
        return {"error": "Erro ao atualizar o modelo atual."}

def create_model_by_id(model_filename, accuracy, precision, recall, f1):
    now = datetime.now().isoformat()
    data = insert_table('Modelo', {
        'DATA_TREINO': now,
        'ACURACIA': accuracy,
        'PRECISAO': precision,
        'RECALL': recall,
        'F1': f1,
        'URL_BUCKET': model_filename
    } ) 
    if data is not None:
        return data
 
def delete_current_model():
    try:
        data = delete_current_model_from_table()
        return data
    except Exception as e:
        print(e)
    
def delete_model_and_file_by_id(id):
    deleted_row = delete_model_from_table(id)

    if deleted_row:
        x = deleted_row[0]
        response = delete_model_from_bucket(x['URL_BUCKET'], 'modelos-it-cross')

        if response:
            return {"message": f"Modelo e arquivo {url} deletados com sucesso."}
        
        return {"error": "Erro ao deletar o modelo e o arquivo."}
    
    return {"error": "Erro ao deletar o modelo."}

# Func para buscar e preparar todos os dados do banco de dados para treinar um novo modelo abaixo 

# Variável de ambiente para buscar dados do Supabase
FETCH_ALL_DATA = os.getenv("FETCH_ALL_DATA")

# Função assíncrona para buscar dados do Supabase
async def fetch_data_from_supabase():
    async with httpx.AsyncClient() as client:
        try:
            response = await client.get(FETCH_ALL_DATA)
            response.raise_for_status()  # Levanta um erro se a resposta não for 200
            data = response.json()  # Extraindo os dados JSON da resposta
            return pd.DataFrame(data)  # Convertendo para um DataFrame do pandas
        except httpx.RequestError as e:
            print(f"Request error: {e}")
            return None  # Retorna None em caso de erro

# Função para aplicar SMOTE
def apply_smote(X_train, y_train):
    unique, counts = np.unique(y_train, return_counts=True)
    print("Distribuição das classes em y_train:", dict(zip(unique, counts)))

    if len(counts) > 1:
        smote = SMOTE(sampling_strategy='auto', random_state=42)
        X_resampled, y_resampled = smote.fit_resample(X_train, y_train)
    else:
        print("Apenas uma classe presente; pulando o SMOTE.")
        X_resampled, y_resampled = X_train, y_train

    return X_resampled, y_resampled

# Função para remodelar o conjunto de dados
def reshape_dataset(X_dataset, y_dataset):
    X_dataset = np.array(X_dataset).reshape((X_dataset.shape[0], 1, X_dataset.shape[1]))
    X_dataset = np.array(X_dataset, dtype=np.float32)
    y_dataset = np.array(y_dataset, dtype=np.float32)
    return X_dataset, y_dataset

# Função para criar o modelo LSTM
def create_lstm_model(input_shape):
    model = Sequential()
    model.add(LSTM(50, input_shape=input_shape))
    model.add(Dropout(0.2))
    model.add(Dense(1, activation='sigmoid'))
    model.compile(optimizer=Adam(learning_rate=0.001), 
                  loss='binary_crossentropy', 
                  metrics=['accuracy'])
    return model

# Função para dividir os dados
def split_data(df):
    X = df.drop(columns=['TEM_FALHA_ROD'])
    y = df['TEM_FALHA_ROD']
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)
    X_resampled, y_resampled = apply_smote(X_train, y_train)
    return X_resampled, y_resampled, X_test, y_test

# Função para treinar o modelo LSTM
def train_lstm(X_resampled, y_resampled, epochs=10, batch_size=32):
    X_reshaped, y_reshaped = reshape_dataset(X_resampled, y_resampled)
    model_lstm = create_lstm_model(input_shape=(X_reshaped.shape[1], X_reshaped.shape[2]))
    history = model_lstm.fit(X_reshaped, y_reshaped, epochs=epochs, batch_size=batch_size, validation_split=0.2, verbose=1)
    return model_lstm, history

# Função para salvar o modelo no bucket
def save_model(model, filename, bucketname):
    model_bytes = pickle.dumps(model)
    model_filename  = save_model_to_bucket(model_bytes, filename, bucketname)
    return model_filename

# Função para avaliar o modelo e retornar as métricas em formato JSON
def evaluate_model(model, X_test, y_test):
    X_test_reshaped, y_test_reshaped = reshape_dataset(X_test, y_test)
    loss_lstm, accuracy_lstm = model.evaluate(X_test_reshaped, y_test_reshaped, verbose=1)
    
    y_pred_lstm = model.predict(X_test_reshaped)
    y_pred_lstm = (y_pred_lstm > 0.5).astype(int)
    
    report = classification_report(y_test_reshaped, y_pred_lstm, output_dict=True)
    accuracy = accuracy_score(y_test_reshaped, y_pred_lstm)

    precision = precision_score(y_test_reshaped, y_pred_lstm, average='weighted')
    recall = recall_score(y_test_reshaped, y_pred_lstm, average='weighted')
    f1= f1_score(y_test_reshaped, y_pred_lstm, average='weighted')

    return accuracy, precision, recall, f1

async def new_model():
    df = await fetch_data_from_supabase()
    yield "data: Dados carregados com sucesso!\n\n"
    await asyncio.sleep(0.1)
    
    if df is not None:
        X_resampled, y_resampled, X_test, y_test = split_data(df)
        yield "data: Separação concluída!\n\n"
        await asyncio.sleep(0.1)

        model_lstm, history = train_lstm(X_resampled, y_resampled)
        yield "data: Treinamento concluído!\n\n"
        await asyncio.sleep(0.1)

        accuracy, precision, recall, f1 = evaluate_model(model_lstm, X_test, y_test)
        yield "data: Avaliação completa!\n\n"
        await asyncio.sleep(0.1)

        now = datetime.now().strftime("%Y-%m-%d-%H-%M-%S")
        model_filename = save_model(model_lstm, f"model-lstm-{now}.pkl", "modelos-it-cross")
        model_metadata = create_model_by_id(model_filename, accuracy, precision, recall, f1)
        yield f"data: Novo modelo: {model_metadata}" + "\n\n"
        yield "data: Modelo Salvo!\n\n"
        await asyncio.sleep(1)
        print("Modelo salvo com sucesso!")

    else:
        yield "data: Erro ao buscar dados.\n\n"
        await asyncio.sleep(0.1)
        print("Erro ao buscar dados.")
