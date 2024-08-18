---
title: Requisitos não funcionais
sidebar_position: 2
slug: "/requisitos_nao_funcionais"
---

# Requisitos não funcionais (RNF)

## Entendendo os requisitos não funcionais
&emsp; Primeiramente, é essencial entender o que são requisitos não funcionais. Requisitos funcionais referem-se a especificações que descrevem funcionalidades específicas que o sistema deve realizar. Em contraste, requisitos não funcionais são especificações que definem critérios de qualidade, restrições ou limitações que o sistema deve atender. Em outras palavras, requisitos funcionais detalham o que o sistema deve fazer, enquanto requisitos não funcionais explicam como o sistema deve fazer.

## RNF do sistema
**RNF01 - Precisão e Confiabilidade:**  
O modelo de classificação deve alcançar uma taxa de acurácia mínima de 95% na classificação de veículos com problemas.

**RNF02 - Escalabilidade e Alta Disponibilidade:**
A infraestrutura deve garantir um SLA acima de 97,0% de disponibilidade.

**RNF03 - Escalabilidade e Alta Disponibilidade:** 
O sistema deve poder ser escalado para atender a um aumento de até 300% na carga de trabalho em momentos de pico, com um tempo de inatividade máximo de 0,01% por mês.

**RNF04 - Tempo de Resposta e Usabilidade:**  
A interface visual deve apresentar os resultados de classificação em até 3 segundos após a solicitação do usuário.

**RNF06 - Tempo de Resposta e Usabilidade:**  
O dashboard deve ser desenvolvido para atender as heurísticas de Nielsen.

**RNF07 - Conformidade com Normas de Proteção de Dados:**  
O sistema deve estar em conformidade com regulamentos de proteção de dados, como LGPD e GDPR, incluindo a implementação de controles de acesso rigorosos e anonimização de dados pessoais quando necessário.

**RNF08 - Compatibilidade e Portabilidade:**
O sistema deve ser compatível com diferentes versões de navegadores (Chrome, Firefox, Safari) e sistemas operacionais (Windows, Linux, macOS). Deve também ser portável para execução em ambientes locais e na nuvem, sem a necessidade de reconfigurações extensivas.
(da para implementar no GitHub Actions)

## Referências 

[1] Requisitos não funcionais: o guia completo!. Disponível em : [betrybe](https://blog.betrybe.com/tecnologia/requisitos-nao-funcionais/)
