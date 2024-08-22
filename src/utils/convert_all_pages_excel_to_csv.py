import pandas as pd
import warnings

# Filtra avisos específicos de openpyxl
warnings.filterwarnings("ignore", category=UserWarning, module="openpyxl.styles.stylesheet")

# Carrega o arquivo xlsx
file_path = '../data/xlsx/FALHAS_PREDICT_1.xlsx'
xlsx = pd.ExcelFile(file_path)

# Cria um DataFrame vazio para armazenar todos os dados
combined_csv = pd.DataFrame()

# Itera por cada aba no arquivo Excel
for sheet_name in xlsx.sheet_names:
    df = xlsx.parse(sheet_name)
    
# Concatena o DataFrame da aba atual com o DataFrame combinado sem adicionar coluna extra
combined_csv = pd.concat([combined_csv, df], ignore_index=True)

# Salva o DataFrame combinado em um arquivo CSV    
combined_csv.to_csv('saida_combinada.csv', index=False)

print("Arquivo CSV gerado com sucesso!")