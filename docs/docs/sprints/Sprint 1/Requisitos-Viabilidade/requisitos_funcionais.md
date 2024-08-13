---
title: Requisitos funcionais
sidebar_position: 1
slug: "/requisitos_funcionais"
---

# Requisitos funcionais

&emsp;Os requisitos funcionais descrevem o comportamento esperado de um sistema, especificando as funcionalidades necessárias para atender às expectativas do usuário. Diferentes dos requisitos não funcionais, que abordam aspectos internos como desempenho e segurança, os requisitos funcionais focam no que o sistema deve fazer para resolver o problema proposto. Eles orientam o desenvolvimento da solução, garantindo que o sistema atenda aos seus objetivos técnicos e operacionais.

&emsp;Esses requisitos geralmente incluem duas partes: a função, que define a ação a ser executada (por exemplo, "calcular o imposto sobre vendas"), e o comportamento, que especifica como essa função deve ser realizada.

&emsp;Com essa base, foram elencados os seguintes requisitos funcionais (RF) para a solução proposta:

**RF01: Classificação de Veículos:**
O sistema deve classificar se o veículo necessita de alguma inspeção ou se apresenta algum problema. Partindo disso, o modelo deve predizer se deverá ser feito uma inspeção ou problema.

**RF02: Segurança e Privacidade:**
O sistema deve garantir a proteção dos dados sensíveis e prevenir acessos não autorizados, assegurando a integridade dos dados durante o processamento e transmissão.

**RF03: Integração com AWS:**
O sistema deve ser projetado para integração com alguma provedora de cloud. A infraestrutura deve ser capaz de escalar automaticamente conforme a demanda e assegurar alta disponibilidade.

**RF04: Interface Visual e Monitoramento dos Dados:**
O resultado do algoritmo deve ser apresentado de forma visual e compreensível em um dashboard para melhor tomada de decisão, indicando o tipo de inspeção necessária para cada veículo.

**RF05: API do Modelo:**
O sistema deve disponibilizar uma API para que a Volkswagen possa integrar o modelo de classificação em seus sistemas internos, permitindo a automação do processo de inspeção. Podendo também fazer o retreino dos modelos com novos dados.

**RF06: Adicionar novos dados:**
O sistema deve permitir a adição de novos dados para treinamento do modelo, garantindo a atualização contínua do algoritmo e a melhoria da precisão das predições.

## Referências
[1] Jain, Anushtha. 2022. ‘What Are Functional Requirements: Examples, Definition, Complete Guide’, Visure Solutions (Visure Solutions) [https://visuresolutions.com/pt/blog/functional-requirements/](https://visuresolutions.com/pt/blog/functional-requirements/) [accessed 20 April 2024]
