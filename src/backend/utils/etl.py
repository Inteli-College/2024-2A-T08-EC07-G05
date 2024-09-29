import pandas as pd
import numpy as np 



"""


TODAS FUNCOES FUNCIONANDO, TRATAMENTO SIMILAR. FALTA APENAS ADICIONAR A LOGICA DE ADICIONAR NO BACK

"""


def RESULTADO_ROUTINE(path: str):
    if path.endswith('.csv'):
        df_resultados = pd.read_csv(path)
    elif path.endswith('.xlsx') or path.endswith('.xls'):
        df_resultados = pd.read_excel(path)
    elif path.endswith('.json'):
        df_resultados = pd.read_json(path)
    elif path.endswith('.parquet'):
        df_resultados = pd.read_parquet(path,engine='pyarrow')
    elif path.endswith('.txt'):
        df_resultados = pd.read_csv(path, delimiter='\t')  # Supondo que seja um arquivo tabulado
    else:
        raise ValueError(f"Formato de arquivo não suportado: {path}")

    df_resultados = df_resultados.drop('Unnamed: 0', axis=1)
    df_resultados = df_resultados.drop(0)

    df_resultados = df_resultados.rename(columns={
        'Unnamed: 1': 'KNR',
        'Unnamed: 2': 'NAME',
        'Unnamed: 3': 'ID',
        'Unnamed: 4': 'STATUS',
        'Unnamed: 5': 'UNIT',
        'Unnamed: 6': 'VALUE_ID',
        'Unnamed: 7': 'VALUE',
        'Unnamed: 8': 'DATA'
    })

    df_resultados = df_resultados.drop_duplicates()
    df_resultados = df_resultados.dropna()

   
    df_resultados['DATA'] = pd.to_datetime(df_resultados['DATA'], errors='coerce')


    pivot_df = df_resultados.pivot_table(index='KNR', columns=["ID", "STATUS"], aggfunc='size', fill_value=0)

    pivot_df.columns = [f'QTD_STATUS_{col[0]}_OK' if col[1] == 10 else f'QTD_STATUS_{col[0]}_NOK' for col in pivot_df.columns]

   
    pivot_df.reset_index(inplace=True)
    pivot_df["TEMPO_MEDIO"] = df_resultados.groupby('KNR').DATA.transform('max') - df_resultados.groupby('KNR').DATA.transform('min')

    pivot_df["TEMPO_MEDIO"] = pivot_df["TEMPO_MEDIO"].dt.total_seconds() / 60
    pivot_df.dropna()
    return pivot_df




def FALHAS_ROUTINE(path: str):
    # Suporte pra varios arquivos
    if path.endswith('.csv'):
        df = pd.read_csv(path)
    elif path.endswith('.xlsx') or path.endswith('.xls'):
        df = pd.read_excel(path)
    elif path.endswith('.json'):
        df = pd.read_json(path)
    elif path.endswith('.parquet'):
        df = pd.read_parquet(path,engine='pyarrow')
    elif path.endswith('.txt'):
        df = pd.read_csv(path, delimiter='\t')  # Supondo que seja um arquivo tabulado
    else:
        raise ValueError(f"Formato de arquivo não suportado: {path}")
    
    df = df.drop('Unnamed: 0', axis=1)  
    df = df.drop(0)
    df = df.rename(columns={
        'Unnamed: 1': 'KNR',
        'Unnamed: 2': 'MODELO',
        'Unnamed: 3': 'COR',
        'Unnamed: 4': 'MOTOR',
        'Unnamed: 5': 'ESTACAO',
        'Unnamed: 6': 'USUARIO',
        'Unnamed: 7': 'HALLE',
        'Unnamed: 8': 'FALHA',
        'Unnamed: 9': 'S_GROUP_ID',
        'Unnamed: 10': 'DATA'
    })
    df.drop(columns='MODELO', inplace=True) # Remove a coluna MODELO
    df.drop_duplicates(inplace=True) # Remove duplicadas
    df['FALHA'] = df['FALHA'].str.upper()  # Converte todos os valores da coluna 'FALHA' para maiúsculas
    df[['PEÇA', 'FALHA_PEÇA']] = df['FALHA'].str.split(' ', expand=True, n=1)  # Divide 'FALHA' em 'PEÇA' e 'FALHA_PEÇA'
    df['HALLE'] = df['HALLE'].str.split(' ').str[0]  # Mantém apenas o primeiro elemento após dividir 'HALLE' por espaço
    df['DATA'] = pd.to_datetime(df['DATA'], dayfirst=True)
    df['MES_ANO'] = df['DATA'].dt.to_period('M')
    df['S_GROUP_ID'] = df['S_GROUP_ID'].astype(str)

    # Pivot table para HALLE
    pivot_halle = df.pivot_table(index='KNR', columns='HALLE', aggfunc='size', fill_value=0)

    # Pivot table para S_GROUP_ID
    pivot_sgroup = df.pivot_table(index='KNR', columns='S_GROUP_ID', aggfunc='size', fill_value=0)

    # Concatenar as duas pivot tables
    result_df = pd.concat([pivot_halle, pivot_sgroup], axis=1)

    # Renomear as colunas para diferenciar HALLE e S_GROUP_ID
    result_df.columns = [f'QTD_HALLE_{col}' for col in pivot_halle.columns] + [f'QTD_SGROUP_{col}' for col in pivot_sgroup.columns]
    result_df.reset_index(inplace=True)  # Reseta o índice do DataFrame e transforma o índice antigo em uma coluna
    motor_cor_df = df.groupby('KNR')[['MOTOR', 'COR']].first().reset_index()  # Agrupa por 'KNR', pega o primeiro 'MOTOR' e 'COR', e reseta o índice
    pivot_df = pd.merge(result_df, motor_cor_df, on='KNR', how='left')        # Faz um merge de 'result_df' com 'motor_cor_df' com base em 'KNR'
    pivot_df['MOTOR'] = pivot_df['MOTOR'].replace(r'^\s*$', np.nan, regex=True) # Substitui valores vazios ou espaços em branco na coluna 'MOTOR' por NaN
    cols = pivot_df.columns.tolist()

    # Definir a nova ordem das colunas
    # Certifique-se de incluir 'QTD_FALHAS_SEM_HALLE' apenas uma vez, no final
    new_order = ['KNR', 'MOTOR', 'COR'] + \
                [col for col in cols if col not in ('KNR', 'MOTOR', 'COR')]  # Garante que 'QTD_FALHAS_SEM_HALLE' seja incluída uma vez

    # Aplicar a nova ordem ao DataFrame
    pivot_df = pivot_df[new_order]
    for col in ['MOTOR', 'COR']:
        if col not in result_df.columns:
            result_df[col] = None   
    cols = result_df.columns.tolist()

    # Definindo a nova ordem das colunas
    new_order = ['KNR', 'MOTOR', 'COR'] + \
                [col for col in cols if col not in ('KNR', 'MOTOR', 'COR')]

    # Reorganizando o DataFrame
    result_df = result_df[new_order]
    pivot_df.loc[:, 'TEM_FALHA_ROD'] = np.where(pivot_df['QTD_HALLE_ROD'] > 0, 1, 0)  # Cria a coluna 'TEM_FALHA_ROD' com valor 1 se 'QTD_HALLE_ROD' > 0, caso contrário, 0
    pivot_df.dropna()
    return pivot_df

def STATUS_ROUTINE(path: str):
    # Suporte pra varios arquivos
    if path.endswith('.csv'):
        df = pd.read_csv(path)
    elif path.endswith('.xlsx') or path.endswith('.xls'):
        df = pd.read_excel(path)
    elif path.endswith('.json'):
        df = pd.read_json(path)
    elif path.endswith('.parquet'):
        df = pd.read_parquet(path,engine='pyarrow')
    elif path.endswith('.txt'):
        df = pd.read_csv(path, delimiter='\t')  # Supondo que seja um arquivo tabulado
    else:
        raise ValueError(f"Formato de arquivo não suportado: {path}")

    df.drop(columns='Unnamed: 0', inplace=True)
    df.columns = df.iloc[0]
    df.drop(df.index[0], inplace=True)
    df = df.loc[:, df.columns.notnull()]

    status_to_halle = {
        'R750': 'ZP5',
        'L540': 'ZP5A',
        'G700': 'ZP61',
        'M600': 'ZP6 / ZP62',
        'M620': 'CAB',
        'M700': 'ZP7',
        'M710': 'ROD',
        'M720': 'AGUA',
        'M800': 'ZP8'
    }
    df['HALLE'] = df['STATUS'].map(status_to_halle)

    df = df[df['HALLE'].notna()]

    df['DATA'] = pd.to_datetime(df['DATA'], errors='coerce')

    return df 

def MERGE_DFS(df1: pd.DataFrame, df2: pd.DataFrame):
    df = pd.merge(df1,df2,on='KNR', how='left')
    print('merging dfs')
    print(df.head(5))
    return df

