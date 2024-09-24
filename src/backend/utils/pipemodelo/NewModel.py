import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split, KFold
from sklearn.metrics import classification_report, accuracy_score
from imblearn.over_sampling import SMOTE
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import LSTM, Dense, Dropout
from tensorflow.keras.optimizers import Adam
from sqlalchemy import create_engine  # Correção: importação adicionada
import tempfile  # Correção: importação adicionada

def fetch_data_from_db(database_url, table_name):
    # Criar uma conexão com o banco de dados
    engine = create_engine(database_url)
    
    # Consultar os dados da tabela
    query = f"SELECT * FROM {table_name}"
    df = pd.read_sql(query, con=engine)

    # Salvar os dados em um arquivo CSV temporário
    temp_file = tempfile.NamedTemporaryFile(delete=False, suffix='.csv')
    df.to_csv(temp_file.name, index=False)

    print(f"Dados salvos em {temp_file.name}")
    return df, temp_file.name

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
def split_data(df_numerical_scaled):
    X = df_numerical_scaled.drop(columns=['TEM_FALHA_ROD'])  # Removendo a variável alvo
    y = df_numerical_scaled['TEM_FALHA_ROD']  # Definindo a variável alvo
    
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



if __name__ == "__main__":
    # Defina a URL do banco de dados e o nome da tabela
    database_url = 'sqlite:///your_database.db'  # Exemplo com SQLite
    table_name = 'sua_tabela'

    # Passo 1: Extrair dados do banco de dados
    df, temp_csv_path = fetch_data_from_db(database_url, table_name)
    
    # Usar os dados diretamente do banco de dados, ao invés de carregar outro CSV
    df_numerical_scaled = df

    # Dividir os dados e aplicar SMOTE
    X_resampled, y_resampled, X_test, y_test = split_data(df_numerical_scaled)

    # Realizar validação cruzada e treinar o modelo
    model_lstm, train_losses, val_losses = cross_validate_lstm(X_resampled, y_resampled)

    # Avaliar o modelo no conjunto de teste
    evaluate_model(model_lstm, X_test, y_test)
