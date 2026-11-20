# Conversor de Arquivos

Aplicação web desenvolvida com **Angular** no frontend e **Python com FastAPI** no backend, que permite converter arquivos de imagens e documentos entre diferentes formatos.

O projeto utiliza **Docker e Docker Compose** para facilitar a configuração e execução da aplicação, sem a necessidade de instalar manualmente todas as dependências.

## Tecnologias utilizadas

- **Angular 22** — Interface do usuário
- **Tailwind CSS** — Estilização
- **FastAPI** — API REST


## Estrutura do projeto

```text
Conversor/
├── conversor/
│   ├── Dockerfile
│   ├── nginx.conf
│   ├── package.json
│   └── src/
│
├── conversor-api/
│   ├── Dockerfile
│   ├── requirements.txt
│   └── main.py
│
├── compose.yaml
└── README.md
```

## Como executar com Docker

### Pré-requisitos

É necessário ter instalado:

- Docker Desktop
- Git

O Docker Desktop deve estar em execução.

### 1. Clonar o repositório

```bash
git clone https://github.com/FabioJLimaJ/Conversor.git
```

Entre na pasta do projeto:

```bash
cd Conversor
```

### 2. Construir as imagens Docker

Na raiz do projeto, execute:

```bash
docker compose build
```

Esse comando constrói duas imagens:

| Imagem | Descrição |
|---|---|
| `conversor-frontend` | Aplicação Angular com Nginx |
| `conversor-backend` | API Python com FastAPI |

### 3. Iniciar os containers

```bash
docker compose up -d
```

O parâmetro `-d` permite executar os containers em segundo plano.

Também é possível construir e iniciar tudo com um único comando:

```bash
docker compose up -d --build
```

### 4. Acessar a aplicação

Após iniciar os containers, acesse:

**Frontend:**

http://localhost:4200

**Documentação interativa da API:**

http://localhost:8000/docs

### 5. Verificar os containers

```bash
docker compose ps
```

### 6. Visualizar os logs

```bash
docker compose logs -f
```

### 7. Encerrar a aplicação

```bash
docker compose down
```

Esse comando para e remove os containers e a rede criada pelo Docker Compose.

## Executando sem Docker

### Frontend — Angular

Entre na pasta do frontend:

```bash
cd conversor
```

Instale as dependências:

```bash
npm install
```

Inicie o servidor:

```bash
npm start
```

Acesse http://localhost:4200.

### Backend — FastAPI

Em outro terminal, entre na pasta:

```bash
cd conversor-api
```

Crie o ambiente virtual:

```bash
python -m venv .venv
```

Ative o ambiente virtual no Windows:

```powershell
.\.venv\Scripts\Activate.ps1
```

Instale as dependências:

```bash
pip install -r requirements.txt
```

Inicie a API:

```bash
uvicorn main:app --reload
```

A API estará disponível em http://localhost:8000.

**Nota:** para executar sem Docker, configure a URL da API no Angular de acordo com o endereço do backend. A configuração `/api` utilizada com Docker depende do proxy Nginx.

## Funcionalidades

- Upload de arquivos pela interface web
- Conversão de imagens entre formatos suportados
- Conversão de documentos para PDF
- Download dos arquivos convertidos
- Validação dos tipos de arquivos
- Comunicação entre frontend e backend por API REST

##  Comandos úteis

| Comando | Descrição |
|---|---|
| `docker compose build` | Construir imagens |
| `docker compose up -d` | Iniciar containers |
| `docker compose up -d --build` | Reconstruir e iniciar |
| `docker compose ps` | Verificar containers |
| `docker compose logs -f` | Visualizar logs |
| `docker compose down` | Encerrar aplicação |
| `docker images` | Listar imagens Docker |
| `docker ps` | Listar containers ativos |

## Desenvolvedor

Desenvolvido por [FabioJLimaJ](https://github.com/FabioJLimaJ).

Projeto criado para praticar desenvolvimento full stack, integração entre frontend e backend, manipulação de arquivos, APIs REST e containerização com Docker.
