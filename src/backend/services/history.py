from database.supabase import query_table
from utils.parser import parse_halle_times, parse_failures

def fetch_history():
    data = query_table('ETL', 'KNR,TEMPO_MEDIO,ZP5_MIN,ZP5A_MIN,ZP61_MIN,ZP6_ZP62_MIN,CAB_MIN,TEM_FALHA_ROD') 

    if data is not None:
        model_data = query_table('Performance', 'KNR,OUTPUT_MODELO')
        for entry in data:
            knr = entry['KNR']
            entry['OUTPUT_MODELO'] = {item['KNR']: item['OUTPUT_MODELO'] for item in model_data}.get(knr, None)
    
    print("Data history:", data)
    return data

def fetch_stats():
    data = query_table('Operacao','HALLE,TEVE_FALHA,GRUPO_FALHA')
    print(data)
    return parse_failures(data)