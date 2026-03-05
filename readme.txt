# Neokoros Task Manager

Aplicação para gerenciamento de tarefas utilizando tecnologias modernas em desenvolvimento Web Ful-sctack.

## Tech Stack

Frontend
- React
- TypeScript
- Tailwind

Backend
- Node.js
- Express
- Prisma

Database
- PostgreSQL

## Funcionalidades

- Autenticação de usuário
- Criação / edição de tarefas
- Gerenciamento de status das tarefas
- API REST
- Rotas privadas seguras

## Arquiterura

Client → API → Prisma ORM → PostgreSQL

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
