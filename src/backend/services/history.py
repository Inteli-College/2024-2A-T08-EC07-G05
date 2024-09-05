from database.supabase import query_table
from  utils.historyDataParser import parse_halle_times


def fetch_history():
    data = query_table('Operacao', 'KNR,HALLE,TEMPO') # KKKKKKKKKKKkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk
    """
    KKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKK
    KKKKKKKKKKKKKKKKKKKKKkkkkkkkkkkkkkkkkkkkkkkkKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKK
    kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk
    kkkkkkkkkkkkkkkkkkkkk
    kkkkkkkkkk
    """
    parsed_data = parse_halle_times(data)
    model_data = query_table('Performance', 'KNR,OUTPUT_MODELO')
    teste_data = query_table('Info', 'KNR,RESULTADO_TESTE')
    print(model_data)
    print(teste_data)
    for entry in parsed_data:
        knr = entry['KNR']
        entry['OUTPUT_MODELO'] = {item['KNR']: item['OUTPUT_MODELO'] for item in model_data}.get(knr, None)
        entry['RESULTADO_TESTE'] = {item['KNR']: item['RESULTADO_TESTE'] for item in teste_data}.get(knr, None)
    return parsed_data
    
