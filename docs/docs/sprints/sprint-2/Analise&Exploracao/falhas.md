---
title: Falhas
sidebar_position: 1
slug: "/falhas"
---

# Análise exploratória e processo de tratamento dos novos dados

&emsp;Nesta sprint, realizamos uma análise exploratória do dataset seguindo a mesma metodologia utilizada em etapas anteriores. Identificamos as colunas presentes, analisamos os dados fornecidos e avaliamos a completude geral do dataset. Abaixo, apresentamos os principais trechos de código utilizados durante este processo:

## Tabela Falhas-Predict-1
&emsp;Abaixo você pode conferir melhor os trechos relevantes de códigos que utilizamos essa etapa:

### 1. Carregamento do Dataset
&emsp;Primeiramente, carregamos o dataset que será utilizado na análise:
```python 
df = pd.read_csv('../../../data/csv/dataset-volks.csv')
df = pd.DataFrame(df)
```

### 2. Identificação das Colunas
&emsp;Observamos as colunas presentes no dataset:

```python
df.columns
```

**Saída** das colunas presentes no dataset:

```python
Index(['Unnamed: 0', 'Unnamed: 1', 'Unnamed: 2', 'Unnamed: 3', 'Unnamed: 4',
       'Unnamed: 5', 'Unnamed: 6', 'Unnamed: 7', 'Unnamed: 8', 'Unnamed: 9',
       'Unnamed: 10'],
      dtype='object')
```

### 3. Renomeação de Colunas
&emsp;Para tornar os nomes das colunas mais significativos, realizamos as seguintes transformações:

```python 
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
```

### 4. Análise dos Modelos
&emsp;Verificamos os diferentes tipos de modelos presentes no dataset:

```python
df['MODELO'].value_counts()
```
**Saída** dos modelos:
```python
MODELO
X       758916
Name: count, dtype: int64
```
&emsp;Como há apenas um modelo presente, removemos essa coluna, pois ela se torna irrelevante para a análise:

```python
df.drop(columns='MODELO', inplace=True)
```

### 5. Contagem e Descrição das Falhas
&emsp;Contamos as falhas diferentes presentes no dataset e analisamos suas descrições:

```python
df['FALHA'].value_counts()
```

**Saída** da contagem e descrição das falhas:

```python
FALHA
Painel lateral 05. Sujeira na pintura                               25471
Painel lateral 04. Caroço / Pico                                    24218
Painel lateral 01. Amassado                                         14914
Painel lateral Sujeira na pintura                                   14372
PAINEL LATERAL 05. SUJEIRA NA PINTURA                               13900
                                                                    ...  
CONECTOR PRINCIPAL TAMPA TRASEIRA DESCONECTADO                          1
PINO TUCKER 063 FALTA ¨                                                 1
Cinto de segurança tras - Conjunto Não trava                            1
Rev. porta - Clip de pressão Solto(a) ¨                                 1
Etiqueta de pressão dos pneus (tampa do tanque) Peça Incorreta ¨        1
Name: count, Length: 6581, dtype: int64
```

### 6. Separação da Descrição da Falha e Peça
&emsp;Para separar a descrição da falha da peça que falhou, criamos duas novas colunas:

```python
df['FALHA'] = df['FALHA'].str.upper()
df[['PEÇA', 'FALHA_PEÇA']] = df['FALHA'].str.split(' ', expand=True, n=1)

df['HALLE'] = df['HALLE'].str.split(' ').str[0]
```

### 7. Análise das Datas
&emsp;Observamos as datas presentes no dataset para entender o intervalo de registros das falhas:

```python
# Converter a coluna 'DATA' para o tipo datetime
df['DATA'] = pd.to_datetime(df['DATA'], dayfirst=True)

# Extrair o mês e o ano
df['MES_ANO'] = df['DATA'].dt.to_period('M')

# Contar os meses presentes
contagem_meses = df['MES_ANO'].value_counts().sort_index()

print(contagem_meses)
```

**Saída** dos meses:

```python
MES_ANO
2023-07       169
2023-08     29612
2023-09     36857
2023-10     43848
2023-11     62782
2023-12     16784
2024-01     35925
2024-02     49876
2024-03     31490
2024-04     69908
2024-05     95371
2024-06    101827
2024-07    121166
2024-08     60384
Freq: M, Name: count, dtype: int64
```

### 8. Pivotamento de Tabelas
&emsp;Criamos novas tabelas pivotando as colunas que julgamos essenciais, como HALLE e S_GROUP_ID, para agrupar os KNRs que aparecem mais de uma vez:

```python
df['S_GROUP_ID'] = df['S_GROUP_ID'].astype(str)
pivot_halle = df.pivot_table(index='KNR', columns='HALLE', aggfunc='size', fill_value=0)
pivot_sgroup = df.pivot_table(index='KNR', columns='S_GROUP_ID', aggfunc='size', fill_value=0)
result_df = pd.concat([pivot_halle, pivot_sgroup], axis=1)
result_df.columns = [f'QTD_HALLE_{col}' for col in pivot_halle.columns] + [f'QTD_SGROUP_{col}' for col in pivot_sgroup.columns]
```

Amostra de **saída**:
```python
 	KNR 	         QTD_HALLE_AGUA 	QTD_HALLE_BUY 	QTD_HALLE_CAB 	QTD_HALLE_DKA 	QTD_HALLE_ESPC 	QTD_HALLE_PROC 	QTD_HALLE_PROF 	QTD_HALLE_PVC  ...
0 	2023-2056234          0.0 	         0.0 	         0.0 	          0.0 	         1.0 	          0.0 	         0.0 	          0.0 	       ... 	
1 	2023-2316417          0.0 	         0.0 	         0.0 	          0.0 	         0.0 	          0.0 	         0.0 	          0.0 	       ... 	
2 	2023-2316420 	      0.0 	         0.0 	         0.0 	          0.0 	         0.0 	          0.0 	         0.0 	          0.0 	       ... 	
3 	2023-3016123 	      0.0 	         0.0 	         0.0 	          0.0 	         0.0 	          0.0 	         0.0 	          0.0 	       ... 	
4 	2023-3016194 	      0.0 	         0.0 	         0.0 	          0.0 	         4.0 	          0.0 	         0.0 	          0.0 	       ...
```
&emsp;Podemos observar que agora cada linha representa um KNR único e que cada coluna seguida por HALLE representa a estação em questão que rolou a falha e o mesmo para o S_GROUP_ID, só que para o grupo que teve falha. 	

### 9. Anexando Colunas Relevantes
&emsp;Anexamos as colunas `MOTOR` e `COR` a cada respectivo `KNR` considerando o dataframe inicial:

```python
motor_cor_df = df.groupby('KNR')[['MOTOR', 'COR']].first().reset_index()
pivot_df = pd.merge(result_df, motor_cor_df, on='KNR', how='left')
```

### 10. Análise da Coluna Target
&emsp;Analisamos a coluna target principal para verificar o balanceamento do dataset:
```python
TEM_FALHA_ROD
0    81739
1     5668
Name: count, dtype: int64
```

&emsp;Observamos que o dataset está desbalanceado, e será necessário realizar um processo de balanceamento antes de treinar o modelo.

### 11. Resultado Final
&emsp;Após as transformações, o dataset resultante possui as seguintes colunas:

```python
Index(['KNR', 'MOTOR', 'COR', 'QTD_HALLE_', 'QTD_HALLE_AGUA', 'QTD_HALLE_BUY',
       'QTD_HALLE_CAB', 'QTD_HALLE_DKA', 'QTD_HALLE_ESPC', 'QTD_HALLE_PROC',
       'QTD_HALLE_PROF', 'QTD_HALLE_PVC', 'QTD_HALLE_ROD', 'QTD_HALLE_RUID',
       'QTD_HALLE_TLUI', 'QTD_HALLE_ZP5', 'QTD_HALLE_ZP5A', 'QTD_HALLE_ZP6',
       'QTD_HALLE_ZP61', 'QTD_HALLE_ZP62', 'QTD_HALLE_ZP7', 'QTD_HALLE_ZP8',
       'QTD_HALLE_ZP82', 'QTD_HALLE_ZP8R', 'QTD_SGROUP_#MULTIVALUE',
       'QTD_SGROUP_-2', 'QTD_SGROUP_1', 'QTD_SGROUP_133', 'QTD_SGROUP_137',
       'QTD_SGROUP_140', 'QTD_SGROUP_2', 'QTD_SGROUP_4', 'QTD_SGROUP_5',
       'QTD_SGROUP_9830946'],
      dtype='object')
```

&emsp;É importante analisar novamente as colunas geradas para verificar a relevância dessas features para o modelo.

## Conclusão

&emsp;Durante esta sprint, conseguimos realizar uma análise detalhada do dataset, identificando e processando as colunas relevantes para a construção de um modelo preditivo. Embora tenhamos encontrado alguns desafios, como o desbalanceamento dos dados, as transformações aplicadas nos permitiram estruturar o dataset de forma adequada para a próxima fase do projeto. A inclusão de novas features, como o agrupamento por HALLE e S_GROUP_ID, e a separação das falhas em peças específicas, são passos cruciais para melhorar a capacidade preditiva do nosso modelo. Nas próximas etapas, focaremos no balanceamento do dataset e no desenvolvimento do modelo preditivo.

