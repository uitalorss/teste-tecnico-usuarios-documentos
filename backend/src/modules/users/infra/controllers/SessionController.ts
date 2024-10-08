import {Request, Response} from "express"
import {container} from "tsyringe";
import { CreateSessionService } from "../../services/CreateSessionService";


export class SessionController {
    public async create(req: Request, res: Response) {
        const {email} = req.body;
        const createSessionService = container.resolve(CreateSessionService);
        const login = await createSessionService.execute({email})
        res.status(200).json({login})
    }
}