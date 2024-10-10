from database.supabase import query_table
from utils.parser import parse_halle_times, parse_failures

def fetch_history():
    data = query_table('ETL', 'KNR,TEMPO_MEDIO,ZP5_MIN,ZP5A_MIN,ZP61_MIN,ZP6_ZP62_MIN,CAB_MIN,TEM_FALHA_ROD') 

    if data is not None:
        model_data = query_table('Performance', 'KNR,OUTPUT_MODELO')
        for entry in data:
            knr = entry['KNR']
            entry['OUTPUT_MODELO'] = {item['KNR']: item['OUTPUT_MODELO'] for item in model_data}.get(knr, None)
    
    return data

def fetch_stats():
    data = query_table('ETL','QTD_SGROUP_MULTIVALUE,QTD_SGROUP_-2,QTD_SGROUP_1,QTD_SGROUP_133,QTD_SGROUP_137,QTD_SGROUP_140,QTD_SGROUP_2,QTD_SGROUP_4,QTD_SGROUP_5,QTD_SGROUP_9830946, QTD_HALLE_ZP5,QTD_HALLE_ZP5A,QTD_HALLE_ZP6,QTD_HALLE_ZP61,QTD_HALLE_ZP62,QTD_HALLE_ZP7' )
    return parse_failures(data)