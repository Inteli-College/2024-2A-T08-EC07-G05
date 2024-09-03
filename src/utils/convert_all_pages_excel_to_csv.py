import pandas as pd
import warnings

# Filtra avisos específicos de openpyxl
warnings.filterwarnings("ignore", category=UserWarning, module="openpyxl.styles.stylesheet")

def convert_xlsx_to_csv(file_path, output_csv_path):
    # Carrega o arquivo xlsx usando pandas com o engine openpyxl
    xlsx = pd.ExcelFile(file_path, engine="openpyxl")
    
    # Cria um DataFrame vazio para armazenar todos os dados
    combined_csv = pd.DataFrame()

    # Itera por cada aba no arquivo Excel
    for sheet_name in xlsx.sheet_names:
        # Carrega a aba atual em um DataFrame
        df = pd.read_excel(xlsx, sheet_name=sheet_name)
        
        # Concatena o DataFrame da aba atual com o DataFrame combinado
        combined_csv = pd.concat([combined_csv, df], ignore_index=True)

    # Salva o DataFrame combinado em um arquivo CSV    
    combined_csv.to_csv(output_csv_path, index=False)
    print("Arquivo CSV gerado com sucesso!")

if __name__ == "__main__":
    # Caminho para o arquivo xlsx
    file_path = '../data/xlsx/RESULTADOS_06_2023_07_2023.xlsx'
    
    # Caminho para o arquivo CSV de saída
    output_csv_path = 'saida_combinada.csv'
    
    # Converte o arquivo xlsx em um único arquivo CSV
    convert_xlsx_to_csv(file_path, output_csv_path)

