---
title: Modelo
sidebar_position: 2
slug: "/modelo-s2"
---

# Implementação de RNN com os modelos LSTM e GRU

&emsp;Durante essa sprint, decidimos implementar Redes Neurais Recorrentes (RNN) para treinar nossos modelos devido à necessidade de capturar tendências temporais nos dados. As RNNs são particularmente eficazes em lidar com sequências de dados, o que é essencial para problemas onde o contexto histórico influencia diretamente as previsões futuras. Dentro das RNNs, optamos por utilizar duas variantes populares: LSTM (Long Short-Term Memory) e GRU (Gated Recurrent Unit).

&emsp;**Por que LSTM e GRU?**

&emsp;Escolhemos os modelos LSTM e GRU por suas capacidades de aprender dependências de longo prazo em séries temporais, mitigando o problema do desaparecimento do gradiente comum em RNNs tradicionais. O LSTM, com suas células de memória e portas de entrada, saída e esquecimento, é ideal para capturar padrões temporais complexos, enquanto o GRU oferece uma arquitetura mais simplificada, mas igualmente poderosa, com menos parâmetros e, consequentemente, menor tempo de treinamento.

&emsp;**Implementação:**

&emsp;Ambos os modelos foram implementados usando a biblioteca Keras com TensorFlow, configurando camadas específicas para lidar com os dados sequenciais. Adicionamos camadas Dropout para prevenir overfitting e, por fim, uma camada densa com ativação sigmoide para realizar a classificação binária.

## Balanceando o Dataset e Divisão entre Treino e Teste

&emsp;Antes de iniciar o treinamento do modelo, é essencial preparar os dados de forma adequada para garantir que o modelo possa generalizar bem e fazer previsões precisas. Dois passos cruciais nesse processo são o balanceamento do dataset e a divisão dos dados em conjuntos de treino e teste.

### Balanceamento do Dataset

&emsp;Nosso conjunto de dados original apresentava um desbalanceamento significativo entre as classes, o que poderia levar o modelo a priorizar a classe majoritária, resultando em um desempenho ruim para a classe minoritária. Para mitigar esse problema, utilizamos a técnica de subamostragem aleatória (RandomUnderSampler), que reduz o número de amostras da classe majoritária para igualá-lo ao número de amostras da classe minoritária, criando um conjunto de dados balanceado.

```python
from imblearn.under_sampling import RandomUnderSampler

# Inicializa o RandomUnderSampler com uma semente fixa para garantir a reprodutibilidade dos resultados
rus = RandomUnderSampler(random_state=0)

# Aplica o balanceamento ao conjunto de dados
X_resampled, y_resampled = rus.fit_resample(X, y)
```

&emsp;Com isso, garantimos que o modelo tenha uma visão mais equilibrada das classes durante o treinamento, o que melhora sua capacidade de aprender padrões relevantes para ambas as classes.


### Divisão entre Treino e Teste

&emsp;Após balancear o dataset, dividimos os dados em conjuntos de treino e teste. Essa divisão é fundamental para avaliar o desempenho do modelo em dados que ele não viu durante o treinamento. Usamos a função train_test_split do scikit-learn, reservando 20% dos dados para teste e mantendo 80% para treino.

```python
from sklearn.model_selection import train_test_split

# Divide os dados balanceados em conjuntos de treino (80%) e teste (20%)
X_train, X_test, y_train, y_test = train_test_split(X_resampled, y_resampled, test_size=0.2, random_state=42)
```

### Preparação dos Dados para o Modelo

&emsp;Como estamos utilizando Redes Neurais Recorrentes (RNN), é necessário ajustar o formato dos dados de entrada. RNNs, incluindo modelos LSTM e GRU, esperam que os dados sejam fornecidos em um formato tridimensional (número de amostras, número de timesteps, número de características). Portanto, ajustamos as dimensões de X_train e X_test para que os dados estejam no formato esperado.

```python
# Ajusta a forma de X_train e X_test para compatibilidade com o modelo RNN
X_train = X_train.values.reshape((X_train.shape[0], 1, X_train.shape[1]))
X_test = X_test.values.reshape((X_test.shape[0], 1, X_test.shape[1]))

# Converte os arrays para o tipo float32, que é o formato esperado pela maioria das redes neurais
X_train = np.array(X_train, dtype=np.float32)
y_train = np.array(y_train, dtype=np.float32)
```

### Transformação das Variáveis Categóricas

&emsp;Por fim, realizamos a codificação das variáveis categóricas em variáveis dummies, o que permite que essas variáveis sejam utilizadas diretamente como entradas no modelo.

```python
# Cria variáveis dummies para as colunas categóricas 'COR' e 'MOTOR'
df = pd.get_dummies(df, columns=['COR', 'MOTOR'], drop_first=True)

# Remove colunas desnecessárias, como 'KNR', que não contribuem para o treinamento do modelo
df = df.drop(columns=["KNR"])
```

&emsp;Com esses passos, nossos dados estão prontos para serem usados no treinamento e avaliação do modelo, garantindo que o processo seja robusto e eficiente.

## Construção dos Modelos RNN: GRU e LSTM

&emsp;Para explorar o potencial das Redes Neurais Recorrentes (RNN) na classificação de falhas, implementamos dois tipos de modelos: GRU (Gated Recurrent Unit) e LSTM (Long Short-Term Memory). Ambos os modelos são bem conhecidos por sua eficácia em tarefas que envolvem sequências temporais.

### Modelo GRU

&emsp;O primeiro modelo que construímos foi baseado em GRU, uma variação das RNNs que é menos complexa em termos computacionais, mas ainda eficaz para muitas aplicações. A construção do modelo foi realizada da seguinte forma:

```python
model_gru = Sequential()  # Cria um modelo sequencial, que é uma pilha linear de camadas

model_gru.add(GRU(50, input_shape=(X_train.shape[1], X_train.shape[2])))  
# Adiciona uma camada GRU com 50 unidades. A forma de entrada é (n timesteps, n características)

model_gru.add(Dropout(0.2))  
# Adiciona uma camada Dropout para prevenir overfitting, desativando aleatoriamente 20% dos neurônios durante o treinamento

model_gru.add(Dense(1, activation='sigmoid'))  
# Adiciona uma camada densa de saída com 1 neurônio e ativação sigmoide para uma tarefa de classificação binária
```

&emsp;Este modelo foi compilado usando o otimizador Adam, com uma taxa de aprendizado de 0.001, e a função de perda de entropia cruzada binária (binary_crossentropy). A métrica de acurácia foi utilizada para avaliar o desempenho do modelo durante o treinamento.

```python
model_gru.compile(optimizer=Adam(learning_rate=0.001), loss='binary_crossentropy', metrics=['accuracy'])
```

&emsp;O modelo GRU foi então treinado por 100 épocas com um tamanho de lote (batch size) de 32, reservando 20% dos dados de treino para validação. Esse processo permitiu avaliar e ajustar a capacidade do modelo de generalizar a partir dos dados de treinamento.

```python
history_gru = model_gru.fit(X_train, y_train, epochs=100, batch_size=32, validation_split=0.2)
```

### Modelo LSTM

&emsp;Em seguida, construímos um modelo LSTM, que é outra variante das RNNs, conhecida por lidar melhor com dependências de longo prazo nas sequências de dados. O modelo LSTM foi configurado de maneira semelhante ao GRU, mas utiliza unidades LSTM em vez de GRU.

```python
model_lstm = Sequential()  # Cria um modelo sequencial para o LSTM

model_lstm.add(LSTM(50, input_shape=(X_train.shape[1], X_train.shape[2])))  
# Adiciona uma camada LSTM com 50 unidades. A forma de entrada é (n timesteps, n características)

model_lstm.add(Dropout(0.2))  
# Adiciona uma camada Dropout para prevenir overfitting, desativando aleatoriamente 20% dos neurônios durante o treinamento

model_lstm.add(Dense(1, activation='sigmoid'))  
# Adiciona uma camada densa de saída com 1 neurônio e ativação sigmoide para uma tarefa de classificação binária
```

&emsp;O modelo LSTM também foi compilado com o otimizador Adam e a mesma configuração de taxa de aprendizado e função de perda.

```python
model_lstm.compile(optimizer=Adam(learning_rate=0.001), loss='binary_crossentropy', metrics=['accuracy'])
```

&emsp;Para capturar melhor os padrões nas sequências de dados, treinamos o modelo LSTM por 200 épocas, com um tamanho de lote de 32, utilizando novamente 20% dos dados para validação.

```python
history_lstm = model_lstm.fit(X_train, y_train, epochs=200, batch_size=32, validation_split=0.2)
```

&emsp;Ambos os modelos foram configurados para uma tarefa de classificação binária, onde o objetivo é prever a presença de falhas em um determinado conjunto de dados temporais. O uso das camadas Dropout em ambos os modelos ajudou a mitigar o risco de overfitting, aumentando a robustez dos modelos.

## Avaliação dos Modelos GRU e LSTM

&emsp;Após o treinamento dos modelos GRU e LSTM, a próxima etapa é avaliar seu desempenho utilizando o conjunto de dados de teste. Nesta seção, discutiremos as métricas de avaliação para ambos os modelos, incluindo a perda (loss), a acurácia (accuracy) e o relatório de classificação.

### Avaliação do modelo GRU

&emsp;O modelo GRU foi avaliado com os dados de teste para medir seu desempenho geral. A seguir, apresentamos as métricas obtidas:

```python
loss_gru, accuracy_gru = model_gru.evaluate(X_test, y_test)
print(f'Test Loss GRU: {loss_gru}')
print(f'Test Accuracy GRU: {accuracy_gru}')
```

&emsp;A perda de teste (Test Loss GRU) e a acurácia de teste (Test Accuracy GRU) são apresentadas abaixo:

- Perda de Teste (Loss): 0.30
- Acurácia de Teste (Accuracy): 0.95

&emsp;Em seguida, realizamos previsões utilizando o modelo GRU e geramos um relatório de classificação para avaliar a qualidade das previsões:

```python
# Fazer previsões com o modelo GRU
y_pred_gru = model_gru.predict(X_test)
y_pred_gru = (y_pred_gru > 0.5).astype(int)

# Exibir o relatório de classificação
print(classification_report(y_test, y_pred_gru))
```

O relatório de classificação para o modelo GRU é o seguinte:

```python
              precision    recall  f1-score   support

         0.0       0.91      1.00      0.95       841
         1.0       1.00      0.89      0.94       824

    accuracy                           0.95      1665
```

- Precisão (Precision): 0.91 para a classe 0 e 1.00 para a classe 1
- Recall: 1.00 para a classe 0 e 0.89 para a classe 1
- F1-Score: 0.95 para a classe 0 e 0.94 para a classe 1

### Avaliação do Modelo LSTM

&emsp;O modelo LSTM foi avaliado de forma semelhante para medir seu desempenho. A seguir, apresentamos as métricas obtidas:

```python
# Avaliar o modelo LSTM com os dados de teste
loss_lstm, accuracy_lstm = model_lstm.evaluate(X_test, y_test)
print(f'Test Loss LSTM: {loss_lstm}')
print(f'Test Accuracy LSTM: {accuracy_lstm}')
```

&emsp;A perda de teste (Test Loss LSTM) e a acurácia de teste (Test Accuracy LSTM) são apresentadas abaixo:

- Perda de Teste (Loss): 0.25
- Acurácia de Teste (Accuracy): 0.96

&emsp;Realizamos previsões utilizando o modelo LSTM e geramos um relatório de classificação para avaliar a qualidade das previsões:

```python
# Fazer previsões com o modelo LSTM
y_pred_lstm = model_lstm.predict(X_test)
y_pred_lstm = (y_pred_lstm > 0.5).astype(int)

# Exibir o relatório de classificação
print(classification_report(y_test, y_pred_lstm))
```

&emsp;O relatório de classificação para o modelo LSTM é o seguinte:

```python
              precision    recall  f1-score   support

         0.0       0.93      1.00      0.96       841
         1.0       1.00      0.92      0.96       824

    accuracy                           0.96      1665
```

- Precisão (Precision): 0.93 para a classe 0 e 1.00 para a classe 1
- Recall: 1.00 para a classe 0 e 0.92 para a classe 1
- F1-Score: 0.96 para ambas as classes

### Conclusão

&emsp;Ambos os modelos, GRU e LSTM, apresentaram um desempenho muito bom com acurácias acima de 95%. O modelo LSTM obteve uma leve vantagem em termos de precisão e F1-Score, especialmente para a classe 1. No entanto, ambos os modelos são eficazes e podem ser utilizados para a tarefa de classificação de falhas.