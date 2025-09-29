<h1 align="center"> CRUD de Anotações — Backend (NestJS) + Frontend (React) + MySQL

<h3>
  Este repositório contém uma aplicação full-stack com API RESTful em NestJS (TypeScript + TypeORM + MySQL) e frontend em React (Vite + TypeScript) para gerenciar anotações (criar, listar, editar e excluir).
</h2>

## 🚀 Tecnologias Utilizadas

- [Node.js](https://nodejs.org/)
- [NestJS](https://nestjs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [MySQL](https://www.mysql.com/)
- [TypeORM](https://typeorm.io/)
- [React](https://react.dev/)
- [Zod](https://zod.dev/)

## 🗂️ Estrutura do Projeto
```bash
CRUD-React-Nest-MySQL/
├── notes-api/      # Backend NestJS (API REST)
│   ├── src/
│   │   └── notes/  # Módulo de notas: entity, DTOs, controller, service
│   ├── .env        # Config. locais (NÃO versionar)
│   └── package.json
├── notes-web/      # Frontend React (Vite + TS)
│   ├── src/
│   ├── index.html
│   └── package.json
└── README.md
```

## 🛠️ Como rodar o projeto localmente

### 📋 Pré-requisitos

- Node.js (versão 18 ou superior recomendada)
- MySQL instalado e rodando localmente
- Git

### 📦 Instalação

1. **Clone o repositório:**

```bash
git clone https://github.com/juliamellolopes/CRUD-React-Nest-MySQL.git
```

2. Instale as dependências Backend:

```bash
cd notes-api
npm install
```

3. Configure o arquivo .env:
Crie um arquivo .env na raiz do projeto com os seguintes dados:

```bash
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_USER=notes_user \\altere_para_sua_senha
DB_PASS=notes_pass \\nome_do_banco
```

4. Suba o banco de dados:

```bash
CREATE DATABASE notes_db;
```

5. Inicie a API:
   
```bash
npm run start:dev
```

6. Instale as dependências Frontend:

```bash
cd notes-web
npm install
```

7. Inicie a aplicação:

```bash
npm run dev
```

8. Acesse: http://localhost:5173

## ⚙️ Funcionalidades da API

A API fornece os seguintes endpoints:

- `GET /notes`  
  Lista todas as notas, ordenadas por updatedAt (desc).

- `GET /notes/:id`  
  Retorna uma nota específica.

- `POST /notes`  
  Cria uma nova nota

- `PATCH /notes/:id`  
  Atualiza título e/ou conteúdo.

- `DELETE /notes/:id`  
  Exclui uma nota.

### Validação

- title: obrigatório em POST, string, max 120.

- content: opcional, string.

- Campos não esperados no payload são removidos e/ou geram erro (global ValidationPipe com whitelist/forbidNonWhitelisted).

## 🧪 Testes Manuais Sugeridos

1. Criar 2–3 notas via frontend.
2. Listar e confirmar ordenação por última atualização.
3. Editar título de uma nota → verificar atualização em tempo real na lista.
4. Excluir uma nota → confirmar remoção.
5. Validar erros: tente criar sem title ou com title > 120 chars (a API deve retornar 400).
