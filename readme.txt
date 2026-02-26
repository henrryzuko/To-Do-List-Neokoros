---  Configuração Back-End  ---

    -> cd api
    -> npm install

    # .env

        -> DATABASE_URL=mysql://'username':'password'@localhost:3306/to_do_neo_db
        -> JWT_SECRET=topsecret

    # MySQL

        -> CREATE DATABASE to_do_neo_db;

    # Prisma

        -> npx prisma migrate deploy
        -> npx prisma generate
        -> npx prisma studio (opcional, se quiser acompnhar o banco)

    -> npm run start:dev (NestJS Backend: http://localhost:3000, CORS Frontend Disponível: http://localhost:5173)



---  Configuração Front-End  ---

    -> cd app
    -> npm install
    -> npm run dev (React + Vit Frontend: http://localhost:5173)

    Obs.: Olhar dentro de /app/src/api/api.ts se a baseURL está conectada à URL do Backedn



---