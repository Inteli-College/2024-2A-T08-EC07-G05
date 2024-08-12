---
title: Requisitos não funcionais
sidebar_position: 1
slug: "/requisitos_nao_funcionais"
---

# Requisitos não funcionais (RNF)

## Entendendo os requisitos não funcionais
&emsp; Primeiramente, é essencial entender o que são requisitos não funcionais. Requisitos funcionais referem-se a especificações que descrevem funcionalidades específicas que o sistema deve realizar. Em contraste, requisitos não funcionais são especificações que definem critérios de qualidade, restrições ou limitações que o sistema deve atender. Em outras palavras, requisitos funcionais detalham o que o sistema deve fazer, enquanto requisitos não funcionais explicam como o sistema deve fazer.

## RNF do sistema
**RF01 - Precisão e Confiabilidade:**  
O modelo de classificação deve alcançar uma taxa de acurácia mínima de 95% na classificação de veículos, garantindo a confiabilidade do sistema para utilização prática. Deve ser realizada validação cruzada com múltiplos conjuntos de dados para assegurar consistência nos resultados.

**RF03 - Escalabilidade e Alta Disponibilidade:**  
O sistema deve ser capaz de escalar automaticamente para atender a um aumento de até 300% na carga de trabalho em momentos de pico, com um tempo de inatividade máximo de 0,01% por mês. A infraestrutura deve garantir um SLA de 99,9% de disponibilidade.

**RF04 - Tempo de Resposta e Usabilidade:**  
A interface visual deve apresentar os resultados de classificação em até 3 segundos após a solicitação do usuário, e ser desenvolvida com princípios de design centrado no usuário, garantindo uma pontuação mínima de 90% em testes de usabilidade.

**RF05 - Conformidade com Normas de Proteção de Dados:**  
O sistema deve estar em conformidade com regulamentos de proteção de dados, como LGPD e GDPR, incluindo a implementação de controles de acesso rigorosos e anonimização de dados pessoais quando necessário. Devem ser realizados testes de vulnerabilidade trimestrais para assegurar a conformidade contínua.

**RF06 - Compatibilidade e Portabilidade:**
O sistema deve ser compatível com diferentes versões de navegadores (Chrome, Firefox, Safari) e sistemas operacionais (Windows, Linux, macOS). Deve também ser portável para execução em ambientes locais e na nuvem, sem a necessidade de reconfigurações extensivas.

## Referências 

[1] Requisitos não funcionais: o guia completo!. Disponível em : [betrybe](https://blog.betrybe.com/tecnologia/requisitos-nao-funcionais/)
