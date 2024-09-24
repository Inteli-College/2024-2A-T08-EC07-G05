# Backend

## Introdução
As principais mudanças no backend da aplicação foram a criação de novas rotas, como a de leitura dos dados de histórico e de análise, e a integração dessas rotas com o frontend. Cada mudança será detalhada abaixo, com a descrição do processo e as justificativas. Além disso, serão apresentados novos passos e possíveis melhorias para a próxima sprint.

## 2. Rotas
A Documentação oficial de todas as rotas pode ser acessada via link do postman: https://documenter.getpostman.com/view/30920057/2sAXqqci5L


## 3. Como executar

Para executar o backend, siga os passos abaixo:

1. Clone o repositório, caso ainda não tenha feito:

```bash  
git clone https://github.com/Inteli-College/2024-2A-T08-EC07-G05.git
```

2. Acesse a pasta do backend:

```bash
cd src/backend
```

3. Instale as dependências:

```bash
pip install -r requirements.txt
```

4. Execute a aplicação:

```bash
fastapi run main.py
``` 


## 3. Próximos passos
Para as próximas sprints, serão implementadas novas rotas no frontend para aprimorar a experiência do usuário e adicionar funcionalidades essenciais. Essas rotas incluirão páginas dedicadas ao processo de ETL (Extração, Transformação e Carregamento) e ao retreinamento do modelo. Essas páginas serão responsáveis por exibir informações relevantes sobre os modelos em uso, como métricas de desempenho, data do último treinamento e status atual. Além disso, essas rotas também permitirão que os usuários ativem as pipelines de ETL e retreinamento diretamente a partir da interface do usuário, proporcionando um controle mais intuitivo e facilitando o gerenciamento dos processos de dados e atualização dos modelos.
