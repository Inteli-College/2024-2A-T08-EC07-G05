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



## Conclusão

&emsp; Quando estavamos analisando os dados de ambas as tabelas, notamos que na tabela PREDICT havia uma coluna a mais do que a outra, coluna na qual faz o agrupamento pelas falhas que são apresentadas na coluna "FALHAS". Essa tabela foi muito utilizada para o desenvolvimento e criação do modelo, já a outra, como tinha as mesmas informações menos essa coluna "S_GROUP-ID", decidimos não usar.

