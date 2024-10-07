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

        if response.status_code == 200:
            model_url = supabase.storage.from_(bucketname).get_public_url(filename)
            return model_url
        else:
            print("Erro ao salvar o modelo no bucket:", response.json())
            return None
    except Exception as e:
        print("An error occurred:", e)
        return None
    
def get_model_from_bucket(filename: str, bucketname: str):

    supabase = create_supabase_client()
    try:
        # Defina a parte base da URL (até o nome do bucket)
        base_url = f"https://ujidmgiotjewdzkhutmy.supabase.co/storage/v1/object/public/{bucketname}/"
        
        # Remover a parte base da URL para obter o caminho do arquivo
        file_path = file_url.replace(base_url, "").split("?")[0]

        # Agora fazemos o download do arquivo
        response = supabase.storage.from_(bucketname).download(file_path)
        
        if response.status_code == 200:
            # Retornar o conteúdo do arquivo
            return response.content
        else:
            print("Erro ao baixar o arquivo:", response.json())
            return None
    except Exception as e:
        print("An error occurred while fetching the file:", e)
        return None
def insert_dataframe_to_etl(df):
    """
    Adiciona um dataframe pandas na tabela de ETL.
    :param df: DataFrame
    :return: Numero de Rows inserido
    """
    supabase = create_supabase_client()
    
    data = df.to_dict('records')
    batch_size = 1000
    successful_inserts = 0
    
    for i in range(0, len(data), batch_size):
        batch = data[i:i+batch_size]
        try:
            response = supabase.table('ETL').insert(batch).execute()
            successful_inserts += len(response.data)
        except Exception as e:
            print(f"Ocorreu um problema inserindo o bloco número {i//batch_size + 1}: {e}")
    
    return successful_inserts
