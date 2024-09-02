import pandas as pd

def convert_xlsx_to_parquet(xlsx_path, parquet_path):
	    # Ler o arquivo Excel
    df = pd.read_excel(xlsx_path)

    # Remover colunas "Unnamed" ou converter colunas problemáticas
    df = df.loc[:, ~df.columns.str.contains('^Unnamed')]

    # Preencher valores ausentes ou converter colunas para string, se necessário
    df = df.fillna('')

    # Converter DataFrame em Parquet
    df.to_parquet(parquet_path, engine='pyarrow', index=False)

if __name__ == "__main__":
    # Specify the path to your Excel file and the output Parquet file
    xlsx_file_path = '../data/xlsx/RESULTADOS_10_2023_11_2023.xlsx'
    parquet_file_path = 'RESULTADOS_10_2023_11_2023.parquet'

    # Convert the Excel file to a Parquet file
    convert_xlsx_to_parquet(xlsx_file_path, parquet_file_path)
