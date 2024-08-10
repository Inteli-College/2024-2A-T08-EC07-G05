---
title: Análise Financeira
sidebar_position: 1
description: Análise Financeira referente a Sprint 1.
---
# Análise Financeira: Viabilidade Econômica do Projeto IT-CROSS

## Introdução

&emsp;Nesta seção, abordaremos a análise financeira do protótipo e do projeto implantado IT-CROSS. Vamos descrever e detalhar os custos associados à produção, desde os custos com desenvolvedores até os impostos sobre o projeto. O objetivo é fornecer uma visão clara dos investimentos necessários para validar a viabilidade do projeto antes de avançar para a implementação em larga escala.

## Levantamento de Custos 

&emsp;Para auxiliar na identificação e estimativa dos custos envolvidos no projeto, dividimos a análise em duas seções distintas: Protótipo e Projeto Implementado. Cada seção aborda os custos específicos relacionados às diferentes fases do projeto, garantindo uma compreensão clara e detalhada dos investimentos necessários.

## Protótipo 

&emsp;Iremos considerar um período de 2 meses para realizar o protótipo, dividindo os custos entre os **desenvolvidores** e o custo da **infraestrutura** para manter a solução na nuvem (cloud), portanto, as pesquisas e o cálculo relacionados aos investimentos será levando em consideração esse tempo.

<p align="center">

### Desenvolvimento de Software: Custso médio da mão de obra

| Função                 | Quantidade | Meses | Salário Mensal | Valor Final    | Fonte                |
| ---------------------  | ---------- | ----- | -------------- | -------------- | -------------------- |
| Engenheiro de Software | 2          | 2     | R$ 6.303,00    | R$ 25.212,00   | [VAGAS](https://www.vagas.com.br/cargo/engenheiro-de-software#:~:text=No%20cargo%20de%20Engenheiro%20de,de%20R%24%206.303%2C00.) |
| Cientista de Dados     | 2          | 2     | R$ 10.053      | R$ 40.212,00   | [GLASSDOR](https://www.glassdoor.com.br/Sal%C3%A1rios/cientista-de-dados-sal%C3%A1rio-SRCH_KO0,18.htm) |
| Engenheiro de DevOps   | 1          | 2     | R$ 9.000       | R$ 18.000      | [GLASSDOR](https://www.glassdoor.com.br/Sal%C3%A1rios/devops-engineer-sal%C3%A1rio-SRCH_KO0,15.htm) |
| Gestor de Projetos     | 1          | 2     | R$ 4.742,00    | R$ 9.484,00   | [VAGAS](https://www.vagas.com.br/cargo/gestao-de-projetos) |
| **Total**              |            |       |                | **R$ 92.908** |                    |

</p>

>Nota: Ao clicar no nome dos sites na coluna "**Fontes**", onde pesquisamos, você será redirecionado diretamente para visualizar os dados da média salarial de cada profissão em questão.
>Data da pesquisa: 10/08/2024

<p align="center">

### Custos da infraestrutura na nuvem (Cloud)

&emsp;Para estimar os custos da infraestrutura em nuvem para o protótipo inicial, pesquisamos e consideramos os seguintes aspectos pensando em um escopo de 2 meses:

| Serviço                | Quantidade | Valor/Mês   | Valor Final | 
| ---------------------  | ---------- | ----- | -------------- | 
| Computação             | 2 instâncias de máquinas virtuais com 4 vCPUs e 16 GB de RAM | R$ 0,50 por hora x 2 instâncias x 160 horas = R$ 1.600,00 | R$ 3.200,00 | 
| Armazenamento          | 500 GB de armazenamento em SSD | R$ 0,25 por GB x 500 GB = R$ 125,00 | R$ 250,00 | 
| Rede                   | 1 TB de transferência de dados | R$ 0,10 por GB x 1.024 GB = R$ 102,40 |  R$ 204,80 |
| Monitoramento e Logs   | Cloud Watch | R$ 200,00 | R$ 400,00    | 
| Banco de Dados         | 200 GB de banco de dados relacional | R$ 500,00 | R$ 1.000,00 | 
| **Total**              |            |       | **R$ 5.054,80**  |  

</p>

>Nota I: As fontes da pesquisa feita para o custo de infraestrutura foram feitas a partir da calculadora de preços de três empresas que oferecem o melhor preço no mercado: [Googl Cloud](https://cloud.google.com/products/calculator/?utm_source=google&utm_medium=cpc&utm_campaign=latam-BR-all-pt-dr-BKWS-all-all-trial-p-dr-1707800-LUAC0014411&utm_content=text-ad-none-any-DEV_c-CRE_534950712418-ADGP_Hybrid+%7C+BKWS+-+PHR+%7C+Txt_GCP-Price+Calculator-KWID_43700071226328618-kwd-527030757336&utm_term=KW_google%20cloud%20platform%20pricing%20calculator-ST_google+cloud+platform+pricing+calculator&gad_source=1&gclid=Cj0KCQjwn9y1BhC2ARIsAG5IY-6JiY0ScOr-yHDcpRZh_r15BxP9dBPXCe7JVaEZTPqJbRbdtnIEzc8aAtZLEALw_wcB&gclsrc=aw.ds), [Azuere](https://azure.microsoft.com/en-us/pricing/calculator/) e [AWS](https://calculator.aws/#/). 
>Nota II: Os impostos sobre esses serviços já são inclusos na cobrança pela plataforma utilizada.

<p align="center">

### Custo total do protótipo

&emsp;Para melhorar a visualização, iremos somar o custo da mão de obra + infraestrutura em uma única tabela:

| Descrição                            | Valor            |
| ------------------------------------ | ---------------- |
| Custos relacionados a mão de obra    | **R$ 92.908,00** |
| Custos relacionados a infraestrutura | **R$ 5.054,80**  |
| Custo total para implementação       | **R$ 97.962,80** |

</p>

<p align="center">

### Valor final: Margem de Lucro + Imposto da Nota Fiscal

&emsp;Ao calcular a margem de lucro, consideramos que ela pode variar um pouco, geralmente ficando entre 10% e 20%. Dado que o aporte para um protótipo de um sistema de manutenção preditiva com IA com arquitetura em nuvem tende a ser caro, é prudente evitar a cobrança de um valor muito elevado. Portanto, calculamos a margem de lucro considerando uma taxa mínima de 10%.

&emsp;Além disso, é importante considerar os impostos de emissão da nota fiscal, que no Brasil representam cerca de 18% do valor total do serviço ou produto. Esse imposto é obrigatório e deve ser incluído no cálculo do valor final para garantir a conformidade fiscal e evitar problemas legais futuros.

&emsp; Para calcular o imposto, utilizamos o método de cálculo "Por dentro". Esse método considera o imposto como parte integrante do valor do produto ou serviço. O resultado é um aumento na alíquota real e no preço final do produto. Por exemplo, se uma camisa custa R$ 100,00, o cálculo do imposto "Por dentro" seria feito da seguinte forma: 100,00 / (1-0,18) = R$ 121,95. Esse cálculo foi aplicado na adição do imposto em nosso projeto. Para mais informações, você pode conferir o artigo sobre [Cálculo "por dentro" X "por fora"](https://www.portaldaindustria.com.br/cni/canais/reforma-tributaria/infograficos/calculo-por-dentro-x-por-fora/).

| Descrição | + Lucro (10%) | Custos + Lucro | Impostos de emissão da NF (18%) | Valor final |
| --------- | ------------- | -------------- | ------------------------------- | ----------- |
| Custos para a implementação do protótipo | R$ 9.796,28 | R$ 107.759,08 | R$ 19.396,63 | R$ 127.155,71 | 

</p>

## Projeto Implementado

&emsp;Para realizar os cálculos e estimativa do projeto implementado após a validação do protótipo iremos seguir na mesma linha de raciocínio, considerando os mesmo serviços e valores, algumas coisas irão mudar, como por exemplo o tempo de desenvolvimento e implementação do produto. 

&emsp;Iremos considerar um período de 6 meses para realizar a implementação do projeto final, dividindo os custos entre os **desenvolvidores**, o custo da **infraestrutura** para manter a solução na nuvem (cloud) e **custos adicionais** para essa segunda fase do projeto, portanto, as pesquisas e o cálculo relacionados aos investimentos será levando em consideração esse tempo.

>Nota: A implementação final do projeto acrescenta 4 meses de trabalho aos 2 meses já dedicados ao desenvolvimento do protótipo. Portanto, o projeto completo, desde a fase inicial (protótipo) até a implementação final, será concluído em **6 meses no total**. Os primeiros **2 meses são destinados à criação e avaliação do protótipo**, seguidos por **4 meses para a implementação completa do sistema.**

<p align="center">

### Desenvolvimento de Software: Custso médio da mão de obra

| Função                 | Quantidade | Meses | Salário Mensal | Valor Final    | Fonte                |
| ---------------------  | ---------- | ----- | -------------- | -------------- | -------------------- |
| Engenheiro de Software | 2          | 4     | R$ 6.303,00    | R$ 50.424,00   | [VAGAS](https://www.vagas.com.br/cargo/engenheiro-de-software#:~:text=No%20cargo%20de%20Engenheiro%20de,de%20R%24%206.303%2C00.) |
| Cientista de Dados     | 2          | 4     | R$ 10.053      | R$ 80.424,00   | [GLASSDOR](https://www.glassdoor.com.br/Sal%C3%A1rios/cientista-de-dados-sal%C3%A1rio-SRCH_KO0,18.htm) |
| Engenheiro de DevOps   | 1          | 4     | R$ 9.000       | R$ 36.000      | [GLASSDOR](https://www.glassdoor.com.br/Sal%C3%A1rios/devops-engineer-sal%C3%A1rio-SRCH_KO0,15.htm) |
| Gestor de Projetos     | 1          | 4     | R$ 4.742,00    | R$ 18.968,00  | [VAGAS](https://www.vagas.com.br/cargo/gestao-de-projetos) |
| **Total**              |            |       |                | **R$ 185.816,00** |                    |

</p>

>Nota: Ao clicar no nome dos sites na coluna "**Fontes**", onde pesquisamos, você será redirecionado diretamente para visualizar os dados da média salarial de cada profissão em questão.
>Data da pesquisa: 10/08/2024

<p align="center">

### Custos da infraestrutura na nuvem (Cloud)

&emsp;Para estimar os custos da infraestrutura em nuvem para o restante da implementação do projeto, pesquisamos e consideramos os seguintes aspectos pensando em um escopo de **+ 4 meses**:

| Serviço                | Quantidade | Valor/Mês   | Valor Final | 
| ---------------------  | ---------- | ----- | -------------- | 
| Computação             | 2 instâncias de máquinas virtuais com 4 vCPUs e 16 GB de RAM | R$ 0,50 por hora x 2 instâncias x 160 horas = R$ 1.600,00 | R$ 6.400,00 | 
| Armazenamento          | 500 GB de armazenamento em SSD | R$ 0,25 por GB x 500 GB = R$ 125,00 | R$ 500,00 | 
| Rede                   | 1 TB de transferência de dados | R$ 0,10 por GB x 1.024 GB = R$ 102,40 |  R$ 409,60 |
| Monitoramento e Logs   | Cloud Watch | R$ 200,00 | R$ 800,00    | 
| Banco de Dados         | 200 GB de banco de dados relacional | R$ 500,00 | R$ 2.000,00 | 
| **Total**              |            |       | **R$ 10.109,60**  |  

</p>

>Nota I: As fontes da pesquisa feita para o custo de infraestrutura foram feitas a partir da calculadora de preços de três empresas que oferecem o melhor preço no mercado: [Googl Cloud](https://cloud.google.com/products/calculator/?utm_source=google&utm_medium=cpc&utm_campaign=latam-BR-all-pt-dr-BKWS-all-all-trial-p-dr-1707800-LUAC0014411&utm_content=text-ad-none-any-DEV_c-CRE_534950712418-ADGP_Hybrid+%7C+BKWS+-+PHR+%7C+Txt_GCP-Price+Calculator-KWID_43700071226328618-kwd-527030757336&utm_term=KW_google%20cloud%20platform%20pricing%20calculator-ST_google+cloud+platform+pricing+calculator&gad_source=1&gclid=Cj0KCQjwn9y1BhC2ARIsAG5IY-6JiY0ScOr-yHDcpRZh_r15BxP9dBPXCe7JVaEZTPqJbRbdtnIEzc8aAtZLEALw_wcB&gclsrc=aw.ds), [Azuere](https://azure.microsoft.com/en-us/pricing/calculator/) e [AWS](https://calculator.aws/#/). 
>Nota II: Os impostos sobre esses serviços já são inclusos na cobrança pela plataforma utilizada.

<p align="center">

### Custos adicionais

&emsp;Após a fase inicial de implementação do protótipo, a finalização do projeto certamente trará custos adicionais. Abaixo, estimamos alguns desses custos, com base na experiência e nas expectativas para a fase II de implementação. No entanto, é importante notar que essa lista não é exaustiva; podem surgir outros custos, assim como alguns dos listados podem não se concretizar.

| Descrição | Estimativa de Custo | Comentários | 
| --------- | ------------------- | ----------- |
| Testes em larga escala | ~ R$ 37.500,00 | Inclui ferramentas de teste e pen testing |  
| Manutenção Contínua | ~ R$ 15.000,00 | Atualizações, correções, otimizações |
| Suporte Pós-Implementação | ~ R$ 75.000,00 | Suporte técnico treinamento |
| Total de custos adicionais | ~ R$ 127.500,00 |

</p>

>Nota I: Os custos adicionais apresentados são estimados e, por isso, indicados com o símbolo de aproximadamente (~). Para os custos de testes, utilizamos as ferramentas da [AWS](https://calculator.aws/#/) como referência. O custo de manutenção foi estimado em ~10% do valor total do projeto. Já para suporte e treinamento, os valores foram baseados em preços de mercado praticados por empresas como Red Hat, Microsoft e consultorias como a ThoughtWorks.

>Nota II: Os custos adicionais são importantes para a finalização do projeto, mas podem ser enxugados e até mesmo considerar o corte de alguns, como suporte e treinamento, para assim garantir a viabilidade econômica. 

<p align="center">

### Custo total do restante da implementação do projeto (+4 meses de desenvolvimento)

&emsp;Para melhorar a visualização, iremos somar o custo da mão de obra + infraestrutura + custos adicionais em uma única tabela:

| Descrição                                        | Valor               |
| ------------------------------------------------ | ------------------- |
| Custos relacionados a mão de obra                | **R$ 185.816,00**   |
| Custos relacionados a infraestrutura             | **R$ 10.109,60**    |
| Custos adcionais                                 | **~ R$ 127.500,00** |
| Custo total para finalizar a implementação       | **R$ 323.425,60**   |

</p>

<p align="center">

### Valor final: Margem de Lucro + Imposto da Nota Fiscal

&emsp;Para calcular o valor final do projeto implementado iremos considerar três vertentes diferentes: I - Primeiro vamos realizar o cálculo do lucro + imposto sobre a implementação dos 2 meses apenas (fase do protótipo). II - Segunda vertente, iremos realizar o cálculo do lucro + imposto sobre a implementação dos 4 meses apenas (que seria a segunda fase do projeto). III - Terceira e última vertente que seria a fase de protótipo + fase final da implementação. Dessa maneira, conseguimos visualizar e comparar as fases da implementação e os custos que o cliete irá ter para realizar o investimento.

:::info

Esse trecho explicando sobre como consideramos e calculamos o lucro + impostos sobre os custos do projeto está bem parecido ao que escrevemos na seção do protótipo, entretanto, alteramos o lucro sobre a implementação final do projeto.

:::

&emsp;Ao calcular a margem de lucro, consideramos uma variação entre 10% e 20%. Para a implementação final do projeto, decidimos utilizar uma margem de 15%, já que a fase de "testes" (protótipo) foi concluída e o cliente optou por seguir com o restante do projeto. Dessa forma, aumentamos a porcentagem de lucro para garantir um bom retorno. No entanto, ao fazer os cálculos finais, a margem de lucro foi ajustada para 14,5%.

&emsp;Além disso, é importante considerar os impostos de emissão da nota fiscal, que no Brasil representam cerca de 18% do valor total do serviço ou produto. Esse imposto é obrigatório e deve ser incluído no cálculo do valor final para garantir a conformidade fiscal e evitar problemas legais futuros.

&emsp; Para calcular o imposto, utilizamos o método de cálculo "Por dentro". Esse método considera o imposto como parte integrante do valor do produto ou serviço. O resultado é um aumento na alíquota real e no preço final do produto. Por exemplo, se uma camisa custa R$ 100,00, o cálculo do imposto "Por dentro" seria feito da seguinte forma: 100,00 / (1-0,18) = R$ 121,95. Esse cálculo foi aplicado na adição do imposto em nosso projeto. Para mais informações, você pode conferir o artigo sobre [Cálculo "por dentro" X "por fora"](https://www.portaldaindustria.com.br/cni/canais/reforma-tributaria/infograficos/calculo-por-dentro-x-por-fora/).

| Descrição | + Lucro | Custos + Lucro | Impostos de emissão da NF (18%) | Valor final |
| --------- | ------------- | -------------- | ------------------------------- | ----------- |
| Custos para a implementação do protótipo | (Lucro de 10%) R$ 9.796,28 | R$ 107.759,08 | R$ 19.396,63 | R$ 127.155,71 | 
| Custos para a implementação da segunda II do projeto | (Lucro de 14,5%) R$ 46.896,71  | R$ 370.322,31 | R$ 66.658,01 | R$ 436.980,32 | 
| Custos para a implementação total do projeto | (Lucro de 10% fase I + 14,5% na fase II) R$ 56.692,99  | R$ 478.081,39 | R$ 86.054,65 | R$ 564.136,04 | 

</p>

## Fontes de Receita

&emsp;Neste tópico, abordaremos as principais fontes de receita do projeto IT-CROSS. Identificar e compreender essas fontes é essencial para garantir a sustentabilidade financeira e o sucesso do projeto a longo prazo. As fontes de receita podem incluir, mas não se limitam as seguintes estratégias que mapeamos:

<p align="center">

### Vendas de Licença de Software

- **Licença Inicial:** Receita gerada pela venda de licenças para o uso do software. Dependendo do modelo de licenciamento escolhido, isso pode incluir licenças perpétuas ou assinaturas anuais.

### Suporte e Manutenção

- **Planos de Suporte:** Receita gerada por contratos de suporte contínuo, oferecendo assistência técnica, manutenção e atualizações regulares. 

- **Manutenção Programada:** Receita proveniente de serviços de manutenção periódica e atualizações de sistema para garantir a continuidade e a eficiência operacional do software.

### Parcerias e Licenciamento de Tecnologia

- **Parcerias Estratégicas:** Receita gerada através de parcerias com outras empresas para a integração do software em suas soluções ou plataformas.

- **Licenciamento de Tecnologia:** Receita proveniente da concessão de licenças para outras empresas utilizarem ou integrarem a tecnologia desenvolvida ao produto, por exemplo, outra montadora de carros utilizar o modelo voltado para sua indústria.

</p>

## Proposta de Valor

## Análise de Viabilidade Financeira 

## Conclusão 