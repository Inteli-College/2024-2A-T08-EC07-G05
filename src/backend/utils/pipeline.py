import asyncio

# Simulação de um pipeline de machine learning
async def execute_pipeline():
    # Carregar dados
    yield "data: Iniciando carregamento dos dados...\n\n"
    await asyncio.sleep(2)  # Simulação da etapa de carregamento de dados
    yield "data: Dados carregados com sucesso!\n\n"
    await asyncio.sleep(0.5)

    # Treinar modelo
    yield "data: Iniciando treinamento do modelo...\n\n"
    await asyncio.sleep(3)  # Simulação de treinamento do modelo
    yield "data: Treinamento concluído!\n\n"
    await asyncio.sleep(0.5)


    # Avaliar modelo
    yield "data: Avaliando modelo...\n\n"
    await asyncio.sleep(2)  # Simulação de avaliação do modelo
    yield "data: Avaliação completa!\n\n"
    await asyncio.sleep(0.5)


    # Finalizar pipeline
    yield "data: Pipeline concluído com sucesso!\n\n"
    await asyncio.sleep(0.5)
