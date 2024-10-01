## Introduçao

O ETL (Extract, Transform, Load) é o processo que consiste no carregamento de dados do treinamento do modelo. As três etapas do ETL são:
- Extração: Os dados são coletados de forma crua via API, podendo ser de diversos formatos, tais como csv, xlsx, parquet e outros. Esta etapa visa consolidar todos os dados necessários para que o processo de transformação possa ocorrer com êxito.
- Transformação: Após serem coletados, os dados passarão por um rigoroso processo de tratamento para serem disponibilizados para o treinamento de novos modelos.
- Carregamento: Com o tratamento feito, os dados são carregados para nosso banco de dados, assim ficando disponíveis para os serviços de treinamento.

Nosso serviço realiza uma implementação prática, permitindo o desenvolvimento e comparação de novos modelos sem nenhum processo de treinamento prévio.


## Endpoint

### POST `/etl/process`

**Descrição:** Processa e insere arquivos de dados no banco de dados, preparando-os para o treinamento de modelos.

**Parâmetros de Entrada:**
- `falhas_file`: Arquivo contendo dados de falhas (aceita formatos CSV, XLSX, JSON, Parquet, TXT).
- `resultados_file`: Arquivo contendo os resultados (aceita formatos CSV, XLSX, JSON, Parquet, TXT).
- `status_file`: Arquivo contendo informações de status (aceita formatos CSV, XLSX, JSON, Parquet, TXT).

**Resposta:**
- **Código 200**: Indica que os dados foram inseridos com sucesso.

![ETL Flow](../../../../static/img/sprint-4/image.png)


## Conclusão

Com a interface desenvolvida pelo grupo IT-CROSS, o teste e desenvolvimento de novos modelos deixa de ser um processo complexo e se torna fácil, rápido e acessível.