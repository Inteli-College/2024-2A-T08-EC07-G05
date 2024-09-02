---
title: Tabelas
sidebar_position: 1
---

# Análise exploratória e processo de tratamento dos novos dados

&emsp;Nesta sprint, realizamos uma análise exploratória do dataset seguindo a mesma metodologia utilizada em etapas anteriores. Identificamos as colunas presentes, analisamos os dados fornecidos e avaliamos a completude geral do dataset. Abaixo, apresentamos os principais trechos de código utilizados durante este processo:

## Tabela: FALHAS_PREDICT
&emsp;Abaixo você pode conferir melhor os trechos relevantes de códigos que utilizamos essa etapa:

### 1. Instalando o pandas, pyarrow e numpy para manusear os dados
```python
!pip install pandas pyarrow numpy
```
### 2. Importando todas as bibliotecas para poder trabalhar com os dados
```python
import pandas as pd
import pyarrow
import matplotlib.pyplot as plt
import numpy as np
import requests
import io
import re
```
### 3. Nomeando o dataset como "df_falhas_predict" e plotando as primeiras 5 linhas
```python
df_falhas_predict = pd.read_csv("../../../data/csv/FALHAS_PREDICT.csv")
df_falhas_predict.head()
```

### 4. Tratamento nas colunas da tabela
&emsp;Tirando a primeira coluna "Unnamed: 0" pois não tinha informações relevantes, depois tiramos a primeira linha e colocamos os nomes certos das colunas
Nome das colunas = 'KNR', 'MODELO', 'COR', 'MOTOR', 'ESTACAO', 'USUARIO', 'HALLE', 'FALHA', 'DATA'
```python
df_falhas_predict.drop(columns = 'Unnamed: 0', inplace=True)
df_falhas_predict.columns = df_falhas_predict.iloc[1]
df_falhas_predict.drop([0,1], axis = 0, inplace=True)
columns = df_falhas_predict.columns.tolist()
print("Columns:", columns)
```

### 5. Contagem e Descrição de Falhas
&emsp;Contagem de falhas e descrição das mesmas:
```python
FALHA
Painel lateral Sujeira na pintura                      30576
Painel lateral 04. Caroço / Pico                       21489
Painel lateral 01. Amassado                            11033
Paralama dianteiro 04. Caroço / Pico                   10986
Tampa dianteira Sujeira na pintura                     10888
                                                       ...  
INTERRUPTOR REG. ALTURA FARÓIS FUNÇÃO NOK                  1
TAMPA DIANTEIRA RUÍDO DE CHAPA                             1
FAROL (09) CHICOTE DANIFICADO (&)                          1
ILUMINAÇÃO TRASEIRA INTERNA CONECTOR DANIFICADO (&)        1
Porta Objetos do Console Central Ajuste incorreto          1
```

### 6. Contagem de Falhas
&emsp;Para separar a descrição da falha da peça que falhou, criamos duas novas colunas:
"PEÇA" e um goupby entre "FALHA_PEÇA".
```python
df_falhas_predict['FALHA'] = df_falhas_predict['FALHA'].str.upper()
df_falhas_predict[['PEÇA', 'FALHA_PEÇA']] = df_falhas_predict['FALHA'].str.split(' ', expand=True, n=1)
df_falhas_predict['HALLE'] = df_falhas_predict['HALLE'].str.split(' ').str[0]
```
Saída da nova coluna "FALHA_PEÇA"
```python
Dianteira FOLGA (AJUSTE)
TRASEIRA FOLGA (AJUSTE)
TRAS (09) INTERFERE
ISNTRUMENTOS RUÍDO(-)
...
```

### 7. Número dos KNR's por ano
&emsp;Aqui, fizemos um agrupamento por ano e contamos a quantidade de KNR's por ano.
```python
count_starts_with_2024 = df_falhas_predict['KNR'].str.startswith('2024').sum()
print("Número de KNRs de 2024:", count_starts_with_2024)
count_starts_with_2023 = df_falhas_predict['KNR'].str.startswith('2023').sum()
print("Número de KNRs de 2023:", count_starts_with_2023)
```
Saída da contagem de KNR's por ano:
```python
Número de KNRs de 2024: 209824
Número de KNRs de 2023: 450984
```

### 8. Tipos de Falhas da coluna MOTOR
&emsp;Aqui, fizemos um agrupamento por tipo de falha na coluna "MOTOR".
```python
df_falhas_predict['MOTOR'].value_counts()
```
Saída da contagem de falhas por tipo de motor:
```python
MOTOR
DHS    423663
CWL    169596
CWS     40191
DRP     24140
DSN      3217
            1
```

## Conclusão

&emsp; Durante essa Sprint-2, quando estavamos analisando os dados de ambas as tabelas, notamos que na tabela PREDICT havia uma coluna a mais do que a outra, coluna na qual faz o agrupamento pelas falhas que são apresentadas na coluna "FALHAS". Essa tabela foi muito utilizada para o desenvolvimento e criação do modelo, já a outra, como tinha as mesmas informações menos essa coluna "S_GROUP-ID", decidimos não usar.



