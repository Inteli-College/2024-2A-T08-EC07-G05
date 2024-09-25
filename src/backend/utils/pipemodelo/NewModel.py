import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split, KFold
from sklearn.metrics import classification_report, accuracy_score
from imblearn.over_sampling import SMOTE
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import LSTM, Dense, Dropout
from tensorflow.keras.optimizers import Adam
import httpx
import os
from datetime import datetime

FETCH_ALL_DATA = os.getenv("FETCH_ALL_DATA")

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

def apply_smote(X_train, y_train):
    smote = SMOTE(sampling_strategy='auto', random_state=42)
    X_resampled, y_resampled = smote.fit_resample(X_train, y_train)
    return X_resampled, y_resampled

def reshape_dataset(X_dataset, y_dataset):
    X_dataset = np.array(X_dataset).reshape((X_dataset.shape[0], 1, X_dataset.shape[1]))  
    X_dataset = np.array(X_dataset, dtype=np.float32)  
    y_dataset = np.array(y_dataset, dtype=np.float32)
    return X_dataset, y_dataset

def create_lstm_model(input_shape):
    model = Sequential()
    model.add(LSTM(50, input_shape=input_shape))  # LSTM layer
    model.add(Dropout(0.2))  # Dropout to prevent overfitting
    model.add(Dense(1, activation='sigmoid'))  # Output layer for binary classification

    model.compile(optimizer=Adam(learning_rate=0.001), 
                  loss='binary_crossentropy', 
                  metrics=['accuracy'])  # Compile the model
    return model

# Dividindo os dados
def split_data(df):
    X = df.drop(columns=['TEM_FALHA_ROD'])  # Removendo a variável alvo
    y = df['TEM_FALHA_ROD']  # Definindo a variável alvo
    
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)
    
    # Balanceamento de classes
    X_resampled, y_resampled = apply_smote(X_train, y_train)
    
    return X_resampled, y_resampled, X_test, y_test

# Validação cruzada e treinamento do modelo LSTM
def cross_validate_lstm(X_resampled, y_resampled, n_splits=5, epochs=10, batch_size=32):
    kfold = KFold(n_splits=n_splits)
    
    train_losses = []
    val_losses = []
    cross_validation_scores_lstm = [] 
    
    # Realizando validação cruzada
    for train_indices, test_indices in kfold.split(X_resampled):
        X_train_fold, y_train_fold = X_resampled[train_indices], y_resampled[train_indices]
        X_test_fold, y_test_fold = X_resampled[test_indices], y_resampled[test_indices]

        # Remodelar os dados
        X_train_reshaped, y_train_reshaped = reshape_dataset(X_train_fold, y_train_fold)
        X_test_reshaped, y_test_reshaped = reshape_dataset(X_test_fold, y_test_fold)

        # Criar modelo LSTM
        model_lstm = create_lstm_model(input_shape=(X_train_reshaped.shape[1], X_train_reshaped.shape[2]))

        # Treinamento
        history = model_lstm.fit(X_train_reshaped, y_train_reshaped, 
                                 epochs=epochs, 
                                 batch_size=batch_size, 
                                 validation_split=0.2,
                                 verbose=1)

        # Avaliação
        score = model_lstm.evaluate(X_test_reshaped, y_test_reshaped, verbose=1)
        cross_validation_scores_lstm.append(score)

        # Armazenar perdas de treino e validação
        train_losses.append(history.history['loss'])
        val_losses.append(history.history['val_loss'])
    
    # Mostrar resultados da validação cruzada
    print("Cross-validation scores for LSTM:", cross_validation_scores_lstm)
    print("Average score for LSTM:", np.mean(cross_validation_scores_lstm, axis=0))
    
    return model_lstm, train_losses, val_losses

# Avaliar o modelo final
def evaluate_model(model, X_test, y_test):
    # Remodelar os dados de teste
    X_test_reshaped, y_test_reshaped = reshape_dataset(X_test, y_test)

    # Avaliar
    loss_lstm, accuracy_lstm = model.evaluate(X_test_reshaped, y_test_reshaped, verbose=1)
    print(f'Test Loss LSTM: {loss_lstm}')
    print(f'Test Accuracy LSTM: {accuracy_lstm}')

    # Previsões
    y_pred_lstm = model.predict(X_test_reshaped)
    y_pred_lstm = (y_pred_lstm > 0.5).astype(int)

    # Relatório de classificação
    print(classification_report(y_test_reshaped, y_pred_lstm))

async def main():
    # Passo 1: Extrair dados do Supabase
    df = await fetch_data_from_supabase()  # Usar await para chamar a função assíncrona
    
    if df is not None:  # Verifica se os dados foram carregados com sucesso
        # Dividir os dados e aplicar SMOTE
        X_resampled, y_resampled, X_test, y_test = split_data(df)

        # Realizar validação cruzada e treinar o modelo
        model_lstm, train_losses, val_losses = cross_validate_lstm(X_resampled, y_resampled)

        # Avaliar o modelo no conjunto de teste
        evaluate_model(model_lstm, X_test, y_test)
    else:
        print("Erro ao buscar dados do Supabase.")

# Executar a função principal
if __name__ == "__main__":
    import asyncio
    asyncio.run(main())
