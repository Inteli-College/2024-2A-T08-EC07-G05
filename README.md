# Inteli - Instituto de Tecnologia e Liderança

<p align="center">
<a href= "https://www.inteli.edu.br/"><img src="docs/static/img/inteli.png" alt="Inteli - Instituto de Tecnologia e Liderança" border="0" width=40% height=40%></a>
</p>

<br>

# IT-CROSS

## 🟣 GitHub Pages

&emsp; A documentação do projeto pode ser acessada pelo GitHub Pages, através do seguinte link:
<a href="https://inteli-college.github.io/2024-2A-T08-EC07-G05/">Link do GitHub Pages</a>

## 👨‍🎓 Integrantes:

- <a href="https://www.linkedin.com/in/josevalencar/">José Alencar</a>
- <a href="https://www.linkedin.com/in/luiza-rubim/">Luiza Rubim</a>
- <a href="https://www.linkedin.com/in/marco-antonio-rizzi-620b56257/">Marco Rizzi</a>
- <a href="https://www.linkedin.com/in/murilo-prianti-0073111a1/">Murilo Prianti</a>
- <a href="https://www.linkedin.com/in/pedro-henrique-coutinho-cruz/">Pedro Cruz</a>
- <a href="https://www.linkedin.com/in/raideoliveira/">Raí de Oliveira</a>
- <a href="https://www.linkedin.com/in/vitoria-novaes/">Vitoria Novaes</a>

## 📜 Descrição

&emsp;A solução It-Cross se trata de um sistema de IA para manutenção preditiva no contexto da linha de produção de carros do modelo T-Cross em uma das fábricas da Volkswagen no Brasil. A solução apresenta um modelo preditivo capaz de auxiliar gerentes de qualidade da empresa a verificar de maneira mais otimizada quais veículos necessitam ou não de testes longos de rodagem, o que é visualizado através de uma aplicação web na nuvem.

## 📚 Professores e Orientadores

- <a href="https://www.linkedin.com/in/geraldo-magela-severino-vasconcelos-22b1b220/">Geraldo Vasconcelos</a>
- <a href="https://www.linkedin.com/in/gui-cestari/">Guilherme Cestari</a>
- <a href="https://www.linkedin.com/in/lisane-valdo/">Lisane Valdo</a>
- <a href="https://www.linkedin.com/in/michele-bazana-de-souza-69b77763/">Michele Bazana de Souza</a>
- <a href="https://www.linkedin.com/in/monica-anastassiu-d-sc-2568522/">Monica Anastassiu</a>
- <a href="https://www.linkedin.com/in/murilo-zanini-de-carvalho-0980415b/">Murilo Zanini de Carvalho</a>
- <a href="https://www.linkedin.com/in/rodrigo-mangoni-nicola-537027158/">Rodrigo Mangoni Nicola</a>

## 📁 Estrutura de diretórios

```bash
.
├── .github
├── docs
│   └── docs
│       └── sprints
│           ├── Sprint 1
│           ├── Sprint 2
│           ├── Sprint 3
│           ├── Sprint 4
│           └── Sprint 5
├── src
│   ├── backend
│   ├── database
│   ├── frontend
│   ├── health
│   ├── notebooks
│   └── utils
├── .gitignore
└── README.md
```

&emsp;&emsp;Dentre os arquivos e pastas presentes na raiz do projeto, define-se:

- <b>.github</b>: contém o arquivo .yaml para deploy da documentação do projeto no Github Pages

- <b>docs</b>: contém os arquivos que compõem a documentação do projeto no formato Docusaurus

- <b>src</b>: contém o código fonte da solução, o que inclui desde o processo de exploração de dados até o frontend

- <b>README.md</b>: arquivo que serve como guia e explicação geral sobre o projeto

- <b>.gitignore</b>: arquivo que impede upload de arquivos indesejados para o repositório

## 🚀 Setup

### Pré requisitos:

Para rodar a solução localmente, é necessário possuir:

1. Git instalado e configurado
2. Docker instalado e configurado
3. WSL instalado e configurado (para sistema operacional Windows)

### Instalação e Execução

1. Numa janela de terminal, clone o repositório do projeto no seu diretório de preferência através do seguinte comando:

```bash
git clone https://github.com/Inteli-College/2024-2A-T08-EC07-G05.git
```

2. Digite o seguinte comando para adentrar na pasta src do repositório

```bash
cd 2024-2A-T08-EC07-G05/src
```

> :bulb:**IMPORTANTE:** Para a próxima etapa, caso você esteja utilizando Windows, digite `wsl` na mesma janela de terminal para iniciar o wsl.

3. Digite o seguinte comando para buildar e incializar cada container da solução

```bash
docker compose up --build
```

4. Por fim, acesse a solução por meio da URL do frontend indicado na janela de terminal após o comando anterior

## Demonstração da Solução

Para conferir um vídeo de demonstração da solução, [clique aqui](https://youtu.be/xyCvN2pKIoo). 

