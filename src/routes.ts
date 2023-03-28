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
router.get('/users', findAllUser.handle)
router.get('/user/:id', findUser.handle)
router.put('/user/:id', updateUser.handle)
router.delete('/user/:id', deleteUser.handle)

export { router }