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