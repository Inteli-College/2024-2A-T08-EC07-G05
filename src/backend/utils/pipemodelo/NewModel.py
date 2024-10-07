import numpy as np
import pandas as pd
from datetime import datetime
import json
import pickle
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report, accuracy_score
from imblearn.over_sampling import SMOTE
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import LSTM, Dense, Dropout
from tensorflow.keras.optimizers import Adam
# from services.model import save_model
import os
import asyncio
import httpx

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
        
# # Função para mockar um DataFrame com 20 linhas
# def mock_data():
#     np.random.seed(42)
#     data = {
#         'feature1': np.random.rand(20),
#         'feature2': np.random.rand(20),
#         'feature3': np.random.rand(20),
#         'feature4': np.random.rand(20),
#         'feature5': np.random.rand(20),
#         'feature6': np.random.rand(20),
#         'feature7': np.random.rand(20),
#         'feature8': np.random.rand(20),
#         'feature9': np.random.rand(20),
#         'feature10': np.random.rand(20),
#         'TEM_FALHA_ROD': np.random.randint(0, 2, size=20)
#     }
#     return pd.DataFrame(data)

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

# Função para exportar o modelo como arquivo .pkl
def save_model(model, filename="models/model_lstm.pkl", bucketname="modelos-it-cross"):
    # Cria o diretório "models" se ele não existir
    os.makedirs(os.path.dirname(filename), exist_ok=True)
    
    # Salva o modelo no arquivo especificado
    with open(filename, 'wb') as file:
        pickle.dump(model, file)
    print(f"Modelo salvo como {filename}")

# Função para avaliar o modelo e retornar as métricas em formato JSON
def evaluate_model(model, X_test, y_test):
    X_test_reshaped, y_test_reshaped = reshape_dataset(X_test, y_test)
    loss_lstm, accuracy_lstm = model.evaluate(X_test_reshaped, y_test_reshaped, verbose=1)
    
    y_pred_lstm = model.predict(X_test_reshaped)
    y_pred_lstm = (y_pred_lstm > 0.5).astype(int)
    
    report = classification_report(y_test_reshaped, y_pred_lstm, output_dict=True)
    accuracy = accuracy_score(y_test_reshaped, y_pred_lstm)
    
    # Retorna um dicionário com as métricas principais
    metrics = {
        "loss": loss_lstm,
        "accuracy": accuracy,
        "classification_report": report
    }
    
    # Converte o dicionário para JSON
    metrics_json = json.dumps(metrics, indent=4)
    print(metrics_json)  
    return metrics_json

# Função principal assíncrona
async def new_model():
    # Mockar os dados
    # df = mock_data()  # --> quando for integrar na nos dados que vem do banco substituir linha pela de baixo
    df = await fetch_data_from_supabase()
    yield "data: Iniciando carregamento dos dados...\n\n"
    yield "data: Dados carregados com sucesso!\n\n"
    
    if df is not None:
        print("Colunas do DataFrame:", df.columns)
        yield "data: Separando dados entre treino e teste...\n\n"
        X_resampled, y_resampled, X_test, y_test = split_data(df)
        yield "data: Separação concluído!\n\n"

        # Treinar o modelo
        yield "data: Iniciando treinamento do modelo...\n\n"
        model_lstm, history = train_lstm(X_resampled, y_resampled)
        yield "data: Treinamento concluído!\n\n"

        # Avaliar o modelo no conjunto de teste
        yield "data: Avaliando modelo...\n\n"
        metrics_json = evaluate_model(model_lstm, X_test, y_test)
        yield "data: Avaliação completa!\n\n"

        # Salvar o modelo
        yield "data: Salvando modelo...\n\n"
        save_model(model_lstm)
        yield "data: Modelo Salvo!\n\n"

        # Retornar as métricas como JSON
        yield metrics_json

    else:
        yield "data: Erro ao buscar dados.\n\n"
        print("Erro ao buscar dados.")

if __name__ == "__main__":
    asyncio.run(new_model())
