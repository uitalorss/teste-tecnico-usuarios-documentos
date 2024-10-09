import {Request, Response} from "express"
import { container } from "tsyringe"
import { CreateUserService } from "../../services/CreateUserService";
import { FindUserService } from "../../services/FindUserService";
import { UpdateUserService } from "../../services/UpdateUserService";
import { DeleteUserService } from "../../services/DeleteUserService";


export class UserController {
    public create(req: Request, res: Response){
        const {name, email} = req.body;
        const createUserService = container.resolve(CreateUserService);
        const user = createUserService.execute({name, email});
        res.json({user})
    }

    public show(req: Request, res: Response){
        const {id} = req.user;
        const findUserService = container.resolve(FindUserService);
        const user = findUserService.execute({id})
        res.json(user)
    }

    public update(req: Request, res: Response){
        const {id} = req.user;
        const {name, email} = req.body;
        const updateUserService = container.resolve(UpdateUserService)
        updateUserService.execute({id, name, email})
        res.status(204).send()
    }

    public delete(req: Request, res: Response){
        const {id} = req.user;
        const deleteUserService = container.resolve(DeleteUserService)
        deleteUserService.execute({id})
        res.status(204).send();
    }

}