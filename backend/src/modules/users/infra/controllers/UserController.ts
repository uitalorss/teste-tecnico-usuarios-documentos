import {Request, Response} from "express"
import { container } from "tsyringe"
import { CreateUserService } from "../../services/CreateUserService";


export class UserController {
    public async create(req: Request, res: Response){
        const {name, email} = req.body;
        const createUserService = container.resolve(CreateUserService);
        const user = await createUserService.execute({name, email});
        res.json({user})
    }
}