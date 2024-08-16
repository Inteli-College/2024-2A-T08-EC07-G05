# Primeiro modelo de predição

## Introdução

&nbsp;&nbsp;A metodologia utilizada para a construção do modelo foi o [CRISP-DM](https://www.datascience-pm.com/crisp-dm-2/), que é uma metodologia com 6 etapas específicas e iterativas de análise de dados, transformando em um ciclo de desenvolvimento. As seis fases dessa metodologia constituem em: entendimento do negócio, entendimento dos dados, preparação dos dados, modelagem, avaliação e implantação. Durante a primeira sprint, iremos trabalhar com as 5 primeiras fases e destacar como elas se enquadram no processo de desenvolvimento da equipe.

## Entendimento do negócio

&nbsp;&nbsp;A primeira etapa do CRISP-DM é o entendimento do negócio, que consiste em compreender o problema proposto e como a solução de um modelo de predição pode agregar valor para o negócio. A partir da apresentação do parceiro no dia 05/08 e do kickoff realizado no dia 09/08, foi possível entender as necessidades do parceiro, como eles iriam utilizar o modelo na empresa, quais as principais dores do cliente e como a solução iria agregar para a empresa de forma geral. Assim, o grupo entendeu que o alvo da predição seria a identificação de falhas em um carro para a etapa de rodagem com base em informações de operações e falhas em outras etapas. A partir dessas informações, foi possível definir o escopo do projeto e estabelecer as metas e objetivos do modelo. Além disso, outro momento importante foi a aula do [Professor Egon](https://www.linkedin.com/in/egondaxbacher/), com mais de 10 anos de experiência na indústria automobilística, sobre a cadeia de produção desse tipo de empresa e estatégias para agregar valor com a solução proposta. Com essas ideias, a equipe conseguiu determinar como o modelo iria agregar para o negócio e quais os principais desafios que a equipe iria enfrentar durante o desenvolvimento do projeto. O próximo passo foi entender os dados fornecidos pelo parceiro e como eles poderiam ser utilizados para a construção do modelo. 

## Entendimento dos dados

&nbsp;&nbsp;No encontro do dia 09/08, a equipe pôde tirar dúvidas mais técnicas em relação aos dados fornecidos pelo parceiro, entender de que forma os dados fornecidos eram relevantes para a modelagem e o formato desejado de entrega. A partir disso, a equipe conseguiu entender como os dados estavam estruturados, quais as variáveis disponíveis, como elas se relacionavam e como elas poderiam ser utilizadas para a construção do modelo. Além disso, foi possível entender a qualidade dos dados, quais eram mais relevantes e em quais pontos focar no primeiro modelo. A partir disso, a equipe passou alguns dias analisando as tabelas fornecidas, sendo uma com as falhas do modelo, algumas com o registro de histórico de operações e outra com os status de cada etapa de produção.

&nbsp;&nbsp;Para o desenvolvimento do modelo, foi utilizado o Jupyter Notebook, uma ferramenta aberto e interativa que permite a execução de códigos em Python, além de permitir a visualização de gráficos e tabelas. A equipe utilizou a biblioteca `pandas` para a leitura e manipulação dos dados e `matplotlib` para a visualização dos dados. 

&nbsp;&nbsp;A principal dificuldade na análise desses dados se deu por problemas de processamento computacional, já que as tabelas eram muito grandes e a equipe não possuía uma máquina com capacidade suficiente para processar todos os dados de uma vez. Além disso, os arquivos estavam em formato .xlsx, o que dificultava a leitura a partir do pandas. A partir disso, a equipe decidiu dividir focas apenas em uma tabela de falha e em uma tabela de histórico de operações, para que fosse possível realizar a preparação dos dados e a modelagem com uma quantidade menor de dados, mas completa o suficiente para a construção do modelo. Em relação ao formato dos dados, foi escolhido o parquet, que é um formato de arquivo colunar que é mais eficiente para a leitura e escrita de dados, além de ser mais compacto que o formato .csv.

## Preparação dos dados

&nbsp;&nbsp;A preparação dos dados é uma das etapas mais importantes do CRISP-DM, pois é nela que a equipe irá preparar os dados para a modelagem, realizando a limpeza, transformação e seleção das variáveis. Após a análise das tabelas, as principais conclusões que a equipe chegou foi em relação ao uso das variáveis pro modelo e a abordagem para a construção do modelo. A principal dúvida foi da coluna "falha", que descreve qual peça está a falha e a condição dela, pois ela necessitaria de um tratamento especial e não havia outra coluna associando a falha a um grupo de falhas específico, como "pintura" ou " mecânica". Dessa forma, dado que o objetivo inicial seria determinar se há uma falha ou não, em vez de qual peça teria falha e qual tipo seria, a equipe decidiu prosseguir sem o uso dessa coluna, que a principio parecia essencial, mas que poderia ser um problema para a modelagem proposta para essa sprint.

&nbsp;&nbsp;Dado essa escolha de não usar a coluna falha, a equipe decidiu trazer como features a quantidade de falha por etapa de produção, ou "HALLE", como indicado pela empresa. E em relação à tabela de histórico de operações, como ela não especificava em qual etapa se referia aquele resultado, mas a qual grupo de operação (máquinas, parafusos ou eletrônicos) as features utilizadas dessa tabela foram a quantidade de operações por grupo de operações que estavam com status ok e a quantidade de operações com status nok, que a equipe entendeu como registro precursor de falhas. Além disso, a equipe decidiu utilizar a coluna "data" da tabela de histórico de operações para criar uma coluna de tempo médio de operações por carro, de modo que a equipe pudesse entender se o tempo de operação influenciava na falha do carro. Outras informações sobre o carro como motor e cor foram utilizadas como features, mas não foram consideradas tão relevantes para a modelagem.

Features selecionadas:

- COR (cor do carro)
- MOTOR (motor do carro)
- FALHA_HALLE_ZP5 (quantidade de falhas na etapa ZP5)
- FALHA_HALLE_ZP6 (quantidade de falhas na etapa ZP6)
... (falhas nas outras etapas)
- QTD_STATUS_OK_MAQUINAS (quantidade de operações com status ok da categoria )
- QTD_STATUS_NOK_MAQUINAS (quantidade de operações com status nok da categoria )
... (status nos outros grupos de operações)
- coluna alvo: TEM_FALHA_ROD (se teve falha na etapa de rodagem, que é a informação buscada pelo parceiro)
- TEMPO_MEDIO_OPERACAO (tempo médio das operações por carro)


## Modelagem

&nbsp;&nbsp;A modelagem é a etapa em que a equipe irá construir o modelo de predição, utilizando algoritmos de machine learning para prever a variável alvo. Para a construção do modelo, a equipe utilizou os modelos `KNN`, `RandomForestClassifier` e `XGBoostClassifier`, dado que o problema é de uma classificação binária (se tem falha em rodagem). Esses modelos foram escolhidos pois o Random Forest possui uma boa capacidade de generalização e é robusto a overfitting, o KNN é um modelo simples e fácil de interpretar e o XGBoost é um modelo indicado para casos com desbalanceamento de dados, pois ele é um conjunto de modelos de árvore de decisão que são treinados sequencialmente, corrigindo os erros dos modelos anteriores e atribuindo pesos maiores para os erros mais graves. Além disso, para lidar com o desbalanceamento dos dados, foi utilizado o scale_pos_weight no modelo XGBoost, que penaliza mais os falsos negativos, que são os casos em que o modelo previu que não haveria falha, mas houve. Foram gerados esses três modelos para fins de comparação e avaliação de desempenho.

## Avaliação

&nbsp;&nbsp;A avaliação é a etapa em que a equipe irá avaliar o desempenho do modelo, verificando se ele está atendendo aos objetivos propostos e se ele está gerando valor para o negócio. Para avaliar o modelo, a equipe utilizou a métrica de...

(A ser preenchido pelo zé)


## Conclusão

(A ser preenchido pelo zé)