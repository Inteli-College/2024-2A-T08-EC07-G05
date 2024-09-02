---
title: Estudo dos Modelos
sidebar_position: 1
slug: "/estudo-modelo-s2"
---

# Modelos RNN

## Como funciona uma Rede Neural Recorrente?
&emsp; As RNNs são feitas de neurônios: nós de processamento de dados que trabalham juntos para realizar tarefas complexas. Os neurônios são organizados como camadas de entrada, saída e ocultas. A camada de entrada recebe as informações a serem processadas e a camada de saída fornece o resultado. O processamento, a análise e a previsão de dados ocorrem na camada oculta. 

## Rede Neural Reccorrente (LSTM)
&emsp;LSTMs (Long Short-Term Memory) foram introduzidos nos anos 90 por Sepp Hochreiter e Juergen Schmidhuber como uma variação das redes neurais recorrentes para solucionar o problema do vanishing gradient, onde o erro desaparece ao longo do tempo e impede o aprendizado.

&emsp;LSTMs funcionam como uma célula de memória que retém informações ao longo do tempo, permitindo que a rede neural aprenda de forma eficiente em contextos onde a relação entre causa e efeito é distante. Eles utilizam "portões" que controlam o armazenamento, a leitura e a exclusão de informações com base na importância dos sinais. Esses portões são analógicos, o que permite que o modelo seja treinado por backpropagation, ajustando os pesos iterativamente.

&emsp;Essas características tornam os LSTMs valiosos em aplicações como processamento de linguagem natural, análise de séries temporais e geração automática de texto.

# Referências 

- 1 AWS. O que é RNN (Rede neural recorrente)? Disponível em: [Amazon](https://aws.amazon.com/pt/what-is/recurrent-neural-network/#:~:text=Uma%20Recurrent%20Neural%20Network%20(RNN,sa%C3%ADda%20de%20dados%20sequencial%20espec%C3%ADfica.)). 

Acesso em:  agosto. 2024.

- 2 Deep Learning Book. Capítulo 10 – As 10 Principais Arquiteturas de Redes Neurais Disponível em: [Deeplearning](https://www.deeplearningbook.com.br/as-10-principais-arquiteturas-de-redes-neurais/). 

Acesso em:  agosto. 2024.
