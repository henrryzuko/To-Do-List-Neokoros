# Neokoros Task Manager

Aplicação para gerenciamento de tarefas utilizando tecnologias modernas em desenvolvimento Web Ful-sctack.

## Tech Stack

Frontend
- React
- TypeScript

Backend
- Node.js
- Express
- Prisma

Database
- MySQL


## Funcionalidades

- Autenticação de usuário
- Criação / edição de tarefas
- Gerenciamento de status das tarefas
- API REST
- Rotas privadas seguras


## Arquiterura

Client → API → Prisma ORM → MySQL

Client (React)
     │
     │ REST Requests
     ▼
API Layer (Express)
     │
     ├── Auth Controller
     ├── Task Controller
     │
     ▼
Service Layer
     │
     ▼
Prisma ORM
     │
     ▼
MySQL


## API Routes

-> Autenticação

POST /auth/register
POST /auth/login

- Exemplo Query (JSON):

POST /auth/register

{
    "name": "Name LastName"
    "email": "email@email.com",
    "password": "123456"
}

- Resposta esperada (Token encriptado):

{
    "token": "JWT_TOKEN"
}

-> Tarefas

- Retornar todas as tarefas:

GET /task

- Criar uma tarefa:

POST /task

- Exemplo Query (JSON):

{
    "description": "Tile/Description",
    "date": "2026-08-22",
}

- Atualizar tarefa:

PUT /task/:id

- Remover ratefa:

DELETE /task/:id


## Índices de rotas para queries

| Método | Rota           | Função                    |
|--------|----------------|---------------------------|
| POST   | /auth/register | Registrar usuário         |
| POST   | /auth/login    | Login usuário             |
| GET    | /tasks         | Listar tarefas do usuário |
| POST   | /tasks         | Criar tarefa              |
| PUT    | /tasks/:id     | Atualizar tarefa          |
| DELETE | /tasks/:id     | Deletar tarefa            |


## Estrutura de pastas do projeto

api/
 |- app
 |- auth
 |- prisma
 |- task
 |- user
 |-- main.ts

frontend/
 |- api
 |- assets
 |- components
 |- contexts
 |- pages
 |- routes
 |- styles
 |- types
 |-- App.tsx
 |-- main.tsx


## Diagrama de relações entre entidades

User
 |- id
 |- name
 |- email
 |- password

Task
 |- id
 |- description
 |- userId
 |- status
 |- date

- Relacionamento: User 1 - N Tasks

## Execução local

git clone https://github.com/henrryzuko/To-Do-List-Neokoros


## Back-End

- cd api
- npm install


## .env

- DATABASE_URL=mysql://'username':'password'@localhost:3306/to_do_neo_db
- JWT_SECRET=topsecret


## MySQL

- CREATE DATABASE to_do_neo_db;


## Prisma

- npx prisma migrate deploy
- npx prisma generate
- npx prisma studio (opcional, se quiser acompnhar o banco)
- npm run start:dev (NestJS Backend: http://localhost:3000, CORS Frontend Disponível: http://localhost:5173)


## Front-End

- cd app
- npm install
- npm run dev (React + Vit Frontend: http://localhost:5173)
Obs.: Olhar dentro de /app/src/api/api.ts se a baseURL está conectada à URL do Backend
