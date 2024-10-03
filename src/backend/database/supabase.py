from supabase import Client, create_client
import os
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
