---
title: DataLake
sidebar_position: 2
slug: "/datalake"
---

# DataLake na aplicação

## Introdução: O que é DataLake?

&emsp; Com base em pesquisas feitas para poder explicar melhor o que é um datalake, no próprio site da AWS podemos entender um pouco mais de o que é um datalake.
&emsp; Um data lake é um repositório centralizado que permite armazenar todos os dados de forma estruturada e não estruturada. Pode-se armazenar os dados como estão, sem precisar primeiro estruturar e executar diferentes tipos de análise, desde painéis e visualizações até processamento de big data, análise em tempo real e machine learning para orientar melhores decisões.

## Datalake MINIO

&emsp; Em primeira instância, vale uma explicação de, "o que é o MINIO" e, posteriormente, "como aplicamos o MINIO no nosso projeto".
&emsp; O Minio é um Storage de Objetos, uma arquitetura de armazenamento de dados, que consegue lidar com uma abundância de informações não estruturadas, sem hierarquia. 
&emsp; Ele é uma solução de alto desempenho compatível com os principais recursos do S3 (bem próximo mesmo dos servíços da AWS, é como o MINIO fosse um datalake WEB-SERVICE), que utilizam Buckets – semelhante a uma pasta/diretório de um sistema de arquivos padrão – para organizar objetos. 

## Por que utilizamos MINIO na nossa aplicação

&emsp; Na nossa aplicação, utilizamos o MINIO para guardar os nossos modelos depois de todo o processo de ETL (Extração, Tratamento, Crregamento) com os dados que recebemos da empresa VolksWagen. Passando pelo devido processamento, apresentamos o script de modelagem para de fato gerar o modelo e assim, surge o arquivo ".pkl" para podermos salvar no datlake do MINIO.
&emsp; E o maior motivo para nós termos utilizados o Minio é por ser um servidor de Storage de Objetos 100% compatível com o S3 da AWS e ser Open Source.

&emsp; Os outros motivos estão listados abaixo:

1. **Compatibilidade com S3 da AWS**: O MinIO é 100% compatível com a API do Amazon S3, o que facilita a migração ou integração com serviços na nuvem.
2. **Open Source**: O MinIO é uma solução de código aberto, permitindo maior flexibilidade de customização e sem custos de licenciamento.
3. **Desempenho**: O MinIO oferece altíssimo desempenho, sendo capaz de lidar com grandes volumes de dados com baixa latência, ideal para cenários de big data e machine learning.
4. **Escalabilidade**: O MinIO foi projetado para ser escalável horizontalmente, o que significa que você pode facilmente aumentar a capacidade de armazenamento ao adicionar mais nós ao cluster.


## Como configurar (ambiente Linux)

&emsp;Para configurar o Datalake em um ambiente Linux, siga os seguintes passos:

**1 -** Para baixar a versão mais recente do MinIO, você pode usar o seguinte comando no terminal:

```bash
wget https://dl.min.io/server/minio/release/linux-amd64/minio
```
**2 -** Depois de baixar o executável, dê permissão para executá-lo com o seguinte comando:

```bash
chmod +x minio
```
**3 -** Agora, execute o servidor MinIO, especificando um diretório onde os dados serão armazenados.
Como estamos usando docker compose, temos que certificar que estamos no diretório correto

```bash
src > dockercompose.yml
```
Garantindo que está no diretório certo, devemos rodar o comando:

```bash
docker-compose up
```
**4 -** Para garantir segurança, defina as credenciais de acesso ao MinIO por meio de variáveis de ambiente. 
Estas credenciais serão utilizadas para acessar o painel administrativo do MinIO (vale destacar que as senhas ja estão dentro do .env quando colcoamos para rodar a aplicação pela primeira vez).

```bash
export MINIO_ROOT_USER=${USER_MINIO}
export MINIO_ROOT_PASSWORD=${PASSWORD_MINIO}
```
## Container do MINIO no Docker Compose

&emsp;O arquivo `docker-compose.yml` orquestra todos os serviços da aplicação, permitindo a comunicação entre eles. Aqui, mostro somente do datalake:

```python
minio:
    image: minio/minio
    container_name: itcross-minio
    environment:
      MINIO_ROOT_USER: ${USER_MINIO}
      MINIO_ROOT_PASSWORD: ${PASSWORD_MINIO}
    volumes:
      - ./minio/data:/data
    ports:
      - "9000:9000"
      - "9001:9001"
    command: server /data --console-address ":9001"
    restart: unless-stopped
```

# Explicação dos Serviço MINIO com Docker Compose

- MinIO:
        - Um serviço de armazenamento em nuvem local, utilizando o MinIO. Ele usa a porta `9000` para a API e `9001` para o console administrativo.
        - Os dados são montados em um volume persistente no caminho `./minio/data`.

# Conclusão

O MinIO é uma solução robusta e escalável para a implementação de DataLakes, oferecendo compatibilidade total com S3 da AWS, sendo uma opção flexível e de baixo custo para empresas que desejam construir seu próprio sistema de armazenamento de dados. Em nosso projeto, sua facilidade de integração e alto desempenho o tornam a escolha ideal para armazenar grandes volumes de dados e modelos preditivos. Além disso, o fato de ser open source permite que seja completamente customizado conforme as necessidades do projeto.

# Referências
[1] AWS SERVICE. O que é Data-Lake ?. Disponível em: [https://aws.amazon.com/pt/what-is/data-lake/](https://aws.amazon.com/pt/what-is/data-lake/). Acesso em: 25 setembro. 2024.
[2] SAVE CLOUD. Como funciona o MINIO ?. Disponível em: [://saveincloud.com/pt/blog/armazenamento/saiba-o-que-e-e-como-funciona-o-minio/](://saveincloud.com/pt/blog/armazenamento/saiba-o-que-e-e-como-funciona-o-minio/). Acesso em: 25 setembro. 2024.

