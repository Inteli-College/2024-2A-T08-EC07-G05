from supabase import Client, create_client
import os
import tempfile
from dotenv import load_dotenv, find_dotenv
import pandas as pd
import pickle

load_dotenv(find_dotenv())
api_url: str = os.getenv("SUPABASE_URL")
key: str = os.getenv("SUPABASE_KEY")

def create_supabase_client():
    supabase: Client = create_client(api_url, key)
    return supabase

def query_table(table: str, columns: str):
    """
    Table deve ser o nome da tabela, como 'Operacao'.
    Columns deve ser uma string que lista as tabelas, como 'KNR, HALLE, TEMPO' (Por algum motivo satânico)
    """
    supabase = create_supabase_client()
    try:
        response = supabase.table(table).select(columns).execute()
        return response.data
    except Exception as e:
        print("An error occurred:", e)

def insert_table(table: str, data: dict):
    """
    Table deve ser o nome da tabela, como 'Operacao'.
    Data deve ser um dicionário com os dados a serem inseridos, como {'KNR': '123', 'HALLE': '123', 'TEMPO': '123'}
    """
    supabase = create_supabase_client()
    try:
        response = supabase.table(table).insert(data).execute()
        return response.data
    except Exception as e:
        print("An error occurred:", e)

def get_by_id(table: str, columns: str, id: int):
    """
    Table deve ser o nome da tabela, como 'Operacao'.
    Columns deve ser uma string que lista as tabelas, como 'KNR, HALLE, TEMPO' (Por algum motivo satânico)
    ID é o ID do modelo a ser buscado
    """
    supabase = create_supabase_client()
    try:
        response = supabase.table(table).select(columns).eq('ID_MODELO', id).execute()
        return response.data
    except Exception as e:
        print("An error occurred:", e)

def get_by_knr(table: str, columns: str, knr: str):
    """
    Table deve ser o nome da tabela, como 'Operacao'.
    Columns deve ser uma string que lista as tabelas, como 'KNR, HALLE, TEMPO' (Por algum motivo satânico)
    ID é o ID do modelo a ser buscado
    """
    supabase = create_supabase_client()
    try:
        response = supabase.table(table).select(columns).eq('KNR', knr).execute()
        return response.data
    except Exception as e:
        print("An error occurred:", e)

def get_models_from_table():
    supabase = create_supabase_client()
    try:
        response = supabase.table('Modelo').select('*').execute()
        return response.data
    except Exception as e:
        print("An error occurred:", e)
        return None

def get_current_model_from_table():
    supabase = create_supabase_client()
    try:
        response = supabase.table("Modelo_atual").select("*").execute()
        return response.data
    except Exception as e:
        print("An error occurred:", e)

def get_last_register(table: str, column: str):
    """
    Table deve ser o nome da tabela, como 'Operacao'.
    Columns deve ser uma string que lista as tabelas, como 'KNR, HALLE, TEMPO' (Por algum motivo satânico)
    ID é o ID do modelo a ser buscado
    """
    supabase = create_supabase_client()
    try:
        response = supabase.select([table]).order_by(table.c.column.desc()).limit(1)
        return response.data
    except Exception as e:
        print("An error occurred:", e)

def save_model_to_bucket(model_bytes: bytes, filename: str, bucketname: str):
    supabase = create_supabase_client()
    try:
        response = supabase.storage.from_(bucketname).upload(filename, model_bytes)

        if response.status_code == 200:
            model_url = supabase.storage.from_(bucketname).get_public_url(filename)
            return model_url
        else:
            print("Erro ao salvar o modelo no bucket:", response.json())
            return None
    except Exception as e:
        print("An error occurred:", e)
        return None

def insert_dataframe_to_etl(df: pd.DataFrame):
    """
    Inserts data from a pandas DataFrame into the ETL table in Supabase.
    
    :param df: pandas DataFrame containing the data to be inserted
    :return: Number of rows successfully inserted
    """
    supabase = create_supabase_client()

    # Convert DataFrame to list of dictionaries
    data = df.to_dict('records')
    # Insert data in batches of 1000 rows
    batch_size = 1000
    successful_inserts = 0
    
    for i in range(0, len(data), batch_size):
        batch = data[i:i+batch_size]
        try:
            response = supabase.table('ETL').insert(batch).execute()
            successful_inserts += len(response.data)
        except Exception as e:
            print(f"An error occurred while inserting batch {i//batch_size + 1}: {e}")
    
    return successful_inserts

def insert_table(table: str, data: dict):
    """
    Table deve ser o nome da tabela, como 'Operacao'.
    Data deve ser um dicionário com os dados a serem inseridos, como {'KNR': '123', 'HALLE': '123', 'TEMPO': '123'}
    """
    supabase = create_supabase_client()
    try:
        response = supabase.table(table).insert(data).execute()
        return response.data
    except Exception as e:
        print("An error occurred:", e)

def get_by_id(table: str, columns: str, id: int):
    """
    Table deve ser o nome da tabela, como 'Operacao'.
    Columns deve ser uma string que lista as tabelas, como 'KNR, HALLE, TEMPO' (Por algum motivo satânico)
    ID é o ID do modelo a ser buscado
    """
    supabase = create_supabase_client()
    try:
        response = supabase.table(table).select(columns).eq('ID_MODELO', id).execute()
        return response.data
    except Exception as e:
        print("An error occurred:", e)

def update_table(table: str, data: dict):
    """
    Table deve ser o nome da tabela, como 'Operacao'.
    Data deve ser um dicionário com os dados a serem inseridos, como {'KNR': '123', 'HALLE': '123', 'TEMPO': '123'}
    """
    supabase = create_supabase_client()
    try:
        response = supabase.table(table).update(data).execute()
        return response.data
    except Exception as e:
        print("An error occurred:", e)

def get_last_register(table: str, column: str):
    """
    Table deve ser o nome da tabela, como 'Operacao'.
    Columns deve ser uma string que lista as tabelas, como 'KNR, HALLE, TEMPO' (Por algum motivo satânico)
    ID é o ID do modelo a ser buscado
    """
    supabase = create_supabase_client()
    try:
        response = supabase.select([table]).order_by(table.c.column.desc()).limit(1)
        return response.data
    except Exception as e:
        print("An error occurred:", e)

def save_model_to_bucket(model_bytes: bytes, filename: str, bucketname: str):
    supabase = create_supabase_client()
    try:
        response = supabase.storage.from_(bucketname).upload(filename, model_bytes)
        if response.status_code == 200:
            return filename
        else:
            print("Erro ao salvar o modelo no bucket:", response.json())
            return None
    except Exception as e:
        print("An error occurred:", e)
        return None
    
def get_model_from_bucket(filename: str, bucketname: str):

    supabase = create_supabase_client()
    try:

        response = supabase.storage.from_(bucketname).download(filename)
      
        if response is not None:
            with open(f"{filename}", "wb") as f:
                f.write(response)
            
            with open(filename, "rb") as f:
                model = pickle.load(f)

            print("File downloaded successfully!")
            return model
        else:
            print("Erro ao baixar o arquivo:", response.json())
            return None
    except Exception as e:
        print("An error occurred while fetching the file:", e)
        return None

def delete_model_from_bucket(filename: str, bucketname: str):
    supabase = create_supabase_client()
    try:
        response = supabase.storage.from_(bucketname).remove([filename])

        if response:
            print(f"Arquivo '{filename}' deletado com sucesso do bucket '{bucketname}'.")
            return True
        else:
            print("Erro ao deletar o arquivo do bucket:", response.json())
            return False
    except Exception as e:
        print("An error occurred while deleting the file:", e)
        return False

def delete_model_from_table(id):
    supabase = create_supabase_client()
    try:
        response = supabase.table('Modelo').delete().eq('ID_MODELO', id).execute()
        if response:
            return response.data
    except Exception as e:
        print("An error occurred while deleting the model:", e)
        return False
 
def delete_current_model_from_table():
    supabase = create_supabase_client()
    try:
        row_to_delete = supabase.table('Modelo_atual').select("*").limit(1).execute()
        if row_to_delete.data and len(row_to_delete.data) > 0:
            response = supabase.table('Modelo_atual').delete().eq('ID_MODELO_ATUAL', row_to_delete.data[0]["ID_MODELO_ATUAL"]).execute()
            if response:
                return response.data
        else:
            return "No rows found to delete."
    except Exception as e:
        print("An error occurred while deleting the current model:", e)
        return False