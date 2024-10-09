import { inject, injectable } from "tsyringe";
import { UserRepository } from "../infra/repositories/UserRepository";
import { IGetUserDTO } from "../domain/models/DTO/IGetUserDTO";
import { NotFoundError } from "../../../shared/errors/ApiError";

@injectable()
export class FindUserService {
    constructor(
        @inject("UserRepository")
        private readonly userRepository: UserRepository
    ){}

    public execute({id}: IGetUserDTO){
        const user = this.userRepository.find({id})
        if(!user){
            throw new NotFoundError("Usuário não encontrado.")
        }
        return user
    }
}