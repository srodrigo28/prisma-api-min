### Primeiros passos
    * https://www.youtube.com/watch?v=fo6R94jw6R4
    * [x] npm init -y
    * [x] npm i typescript -D
    * [x] npx tsc --init
    * [x] npm i express
    * [x] npm i @types/express -D
    * [x] npm i ts-node-dev -D
### Config package.json
    "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1",
        "start": "ts-node-dev ./src/server.ts",
        "dev": "ts-node-dev ./src/server.ts"
    },
### Docker OR sqlite
    * docker run --name postgres -e POSTGRES_PASSWORD=postgres -p 5432:5432 -d postgres
    * docker pull mysql
    * docker run -d --name mysql-server -p 3306:3306 -e "MYSQL_ROOT_PASSWORD=root" mysql
### Prisma
    * npm i prisma @types/node -D
    * npx prisma init

### SQlite /prisma/schema.prisma
    datasource db {
        provider = "sqlite"
        url      = "file:./dev.db"
    }
### Todos bancos testados .env
    # DATABASE_URL="postgresql://johndoe:randompassword@localhost:5432/mydb?schema=public"
    # DATABASE_URL="postgresql://postgres:postgres@localhost:5432/prisma?schema=public"

    # Usando POSTGRES
    #    DATABASE_URL="postgresql://postgres:postgres@localhost:5432/prisma?schema=public"
    # Usando POSTGRES

    # usando SENHA em BRANCO
        DATABASE_URL="mysql://root:@localhost:3306/banco2?connection_limit=5&socket_timeout=3"
    # usando SENHA em BRANCO

    # usando usuario Criado
    #    DATABASE_URL="mysql://root2:root2@localhost:3306/banco2?connection_limit=5&socket_timeout=3"
    # usando usuario Criado

### prisma modelos de tabela   /prisma/schema.prisma
    model User {
        id Int @id @default(autoincrement())
        email String @unique
        name String?

        @@map("user")
    }

    model Login {
        id Int @id @default(autoincrement())
        email String @unique
        name String?
        senha String?

        @@map("login")
    }
### npx prisma migrate
    * npx prisma migrate dev --name create_user_login
        
### Prisma Config
    ## Opcional 
        * npx prisma migrate reset
        * npx prisma migrate dev --name change_user_table_name

### Criar o banco com nome de prisma | outro de preferência

### Arquivos e pastas para o projeto exemplo
    src/
        database.ts
            import { PrismaClient } from '@prisma/client'

                const database = new PrismaClient({
                    log: ["error", "info", "query", "warn"]
                })

            export { database }

        routers.ts    /** ESSE ARQUIVO DEPENDE DO CONTROLLER */
            import { Router } from 'express'
            import { /** Todos Methodos User */
                    DeleteUserController, CreateUserController, 
                    FindUserController, FindAllUserController, UpdateUserController 
            } from './controllers/User';

            const router = Router();

            /* TODOS METHODOS USUARIOS */
            const findAllUser = new FindAllUserController
            const findUser = new FindUserController
            const updateUser = new UpdateUserController
            const createUser = new CreateUserController
            const deleteUser = new DeleteUserController

            /* ROTAS USUARIOS */
            router.post('/user', createUser.handle)
            router.get('/user', findAllUser.handle)
            router.get('/user/:id', findUser.handle)
            router.put('/user/:id', updateUser.handle)
            router.delete('/user/:id', deleteUser.handle)

            export { router }

        server.ts /** ESSE ARQUIVO DEPENDE DO routes.ts */
            import express from 'express'
            import { router } from './routes';

            const port = 3333

            const app = express()

            app.use(express.json())

            app.use(router)

            app.listen(port, () => {
                console.log('Server is running! ' + port)
        });

        /controllers
            user.ts
            import { Response, Request } from "express";
            import { database } from "./../database";

            export class FindAllUserController{
                async handle(req: Request, res: Response) {
                    const user = await database.user.findMany()
                    return res.json(user)
                }
            }

            export class FindUserController{
                async handle(req: Request, res: Response) {
                    const { id } = req.params;
                    const user = await database.user.findUnique({
                        where: {
                            id: Number(id)
                        }
                    })
                    return res.json(user)
                }
            }

            export class UpdateUserController{
                async handle(req: Request, res: Response) {
                    const { name, email } = req.body;
                    const { id } = req.params;
                    const user = await database.user.update({
                        where: {
                            id: Number(id)
                        },
                        data: {
                            name, email
                        }
                    })
                    return res.json({user})
                }
            }

            export class CreateUserController{
                async handle(req: Request, res: Response) {
                    const { name, email } = req.body;
                    const user = await database.user.create({
                        data:{
                            name, email
                        }
                    })
                    return res.json(user)
                }
            }

            export class DeleteUserController{
                async handle(req: Request, res: Response) {
                    const { id } = req.params;
                    const user = await database.user.delete({
                        where: {
                            id: Number(id)
                        }
                    })
                    return res.json("User:: Deletado com sucesso")
                }
            }
    
        
    
### Prisma Studio testes gráficos
    * npx prisma studio
    * npm run dev    ||  npm run start
    * pode usar o insominia para testar URLs da api

### Fim
