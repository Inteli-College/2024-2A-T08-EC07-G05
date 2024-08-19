---
title: Requisitos de visualização
sidebar_position: 3
---

# Requisitos de visualização 

&emsp;Por requisitos de visualização, entende-se tudo que será necessário para que o usuário da solução possa visualizar os resultados. Tendo em vista que, de acordo com o especificado na [respectiva seção](./persona.md), a persona principal do projeto desenvolvido pela equipe It-Cross é Luana, uma supervisora da linha de produção de carros da Volkswagen, é necessário que os requisitos de visualização englobem as tarefas diárias desta, que incluem transitar entre pontos da linha constantemente e inspecioná-la de maneira simultânea.

## Necessidades para visualização

1. Visualização de informações que são constantemente atualizadas

&emsp;Para Luana, é importante que as informações sobre a produção dos carros sejam coletadas e exibidas à medida em que ela ocorre e as informações surgem, principalmente em relação às predições de falhas detectadas a partir dos checkpoints da linha de produção. Isso permite uma análise rápida em relação ao tempo real em que a linha de produção opera, o que pode ajudar a evitar a propagação de problemas em pontos específicos e/ou ao longo da linha.

2. Diferentes informações exibidas na visualização

&emsp;Além disso, a visualização que existirá na solução deve detalhar a partir de quais partes do processo de produção do carro surgiu a previsão de falha para determinado veículo, sendo estas partes agrupadas por áreas de produção (como pintura e montagem) e, se possível, conter sugestões de testes específicos para a inspeção final no *Road Test*. Indicadores de Performance (KPIs), como tempo de produção, número de falhas por veículo e comparativos entre veículos com diferentes quantidades de falhas, também podem ser apresentados e, para tal, é necessário que esses dados sejam exibidos de forma clara para análise estratégica. 

## Opções de visualização

&emsp;Como mencionado na TAPI (Termo de Abertura de Projeto Inicial), a visualização dos resultados do modelo é um requisito para a MVP da solução. Para isso e para as necessidades listadas acima, os dashboards interativos são uma ótima opção, uma vez que podem contar com gráficos que permitam filtrar por diferentes checkpoints e proporcionar uma visão clara e imediata do status da produção. Mapas de calor podem ser utilizados para identificar rapidamente as áreas de produção. 

&emsp;Ademais, também é interessante a possibilidade de geração de relatórios automáticos a partir deste dashboard, os quais poderiam ser customizados de acordo com as necessidades dos gerentes e supervisores, incluindo dados históricos e previsões baseadas nos modelos preditivos. Também pode ser interessante que diferentes perfis de visualização sejam implementados para operadores, supervisores e gerentes, de modo que cada perfil receba as informações mais relevantes para suas responsabilidades.

## Possibilidades de acesso

&emsp;O acesso aos dashboards e relatórios deve ser possível através de um portal web seguro, permitindo que diferentes perfis de usuários acessem as informações de qualquer dispositivo com conexão à internet. Além disso, a visualização pode ser integrada com sistemas existentes na planta da Volkswagen.