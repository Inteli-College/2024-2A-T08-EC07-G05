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
        print(f"CAMADA DE DADOS: {response.data}")
        return response.data
    except Exception as e:
        print("An error occurred:", e)
