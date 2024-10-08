import {Request, Response} from "express"
import { container } from "tsyringe"
import { CreateUserService } from "../../services/CreateUserService";
import { FindAllUsers } from "../../services/FindAllUsers";
import { FindUser } from "../../services/FindUser";


export class UserController {
    public async create(req: Request, res: Response){
        const {name, email} = req.body;
        const createUserService = container.resolve(CreateUserService);
        const user = await createUserService.execute({name, email});
        res.json({user})
    }

    public async showAll(req: Request, res: Response){
        const findAllUsers = container.resolve(FindAllUsers);
        const users = await findAllUsers.execute()
        res.json({users})
    }

    public async show(req: Request, res: Response){
        const {id} = req.params;
        const findUser = container.resolve(FindUser);
        const user = await findUser.execute({id})
        res.json(user)
    }

}