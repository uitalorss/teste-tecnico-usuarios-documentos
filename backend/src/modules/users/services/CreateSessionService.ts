import dotenv from "dotenv";
import { inject, injectable } from "tsyringe";
import { UserRepository } from "../infra/repositories/UserRepository";
import { ISessionUserDTO } from "../domain/models/DTO/ISessionUserDTO";
import { BadRequestError, NotFoundError } from "../../../shared/errors/ApiError";
import {sign} from "jsonwebtoken";
dotenv.config()

@injectable()
export class CreateSessionService {
    constructor(
        @inject("UserRepository")
        private readonly userRepository: UserRepository
    ){}

    public execute({email}: ISessionUserDTO) {
        const user = this.userRepository.findByEmail(email);
        if(!user){
            throw new NotFoundError("Usuário não encontrado.");
        }

        if(!process.env.JWT_KEY) {
            throw new BadRequestError("Erro na validação da sessão")
        }

        const token = sign({id: user.id}, process.env.JWT_KEY, {
            expiresIn: "1h",
        })
        return {
            token
        }
    }
}