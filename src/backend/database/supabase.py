from supabase import Client, create_client
import os
import tempfile

from dotenv import load_dotenv, find_dotenv
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
        return response
    except Exception as e:
        print("An error occurred:", e)