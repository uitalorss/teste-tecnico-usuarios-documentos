import {Request, Response} from "express"
import { container } from "tsyringe"
import { CreateUserService } from "../../services/CreateUserService";
import { FindAllUsersService } from "../../services/FindAllUsersService";
import { FindUserService } from "../../services/FindUserService";
import { UpdateUserService } from "../../services/UpdateUserService";
import { DeleteUserService } from "../../services/DeleteUserService";


export class UserController {
    public async create(req: Request, res: Response){
        const {name, email} = req.body;
        const createUserService = container.resolve(CreateUserService);
        const user = await createUserService.execute({name, email});
        res.json({user})
    }

    public async showAll(req: Request, res: Response){
        const findAllUsersService = container.resolve(FindAllUsersService);
        const users = await findAllUsersService.execute()
        res.json({users})
    }

    public async show(req: Request, res: Response){
        const {id} = req.params;
        const findUserService = container.resolve(FindUserService);
        const user = await findUserService.execute({id})
        res.json(user)
    }

    public async update(req: Request, res: Response){
        const {id} = req.params;
        const {name, email} = req.body;
        const updateUserService = container.resolve(UpdateUserService)
        await updateUserService.execute({id, name, email})
        res.status(204).send()
    }

    public async delete(req: Request, res: Response){
        const {id} = req.params;
        const deleteUserService = container.resolve(DeleteUserService)
        await deleteUserService.execute({id})
        res.status(204).send();
    }

}