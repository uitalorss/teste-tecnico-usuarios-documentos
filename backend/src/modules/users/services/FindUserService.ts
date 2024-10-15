import { inject, injectable } from "tsyringe";
import { UserRepository } from "../infra/repositories/UserRepository";
import { IGetUserDTO } from "../domain/models/DTO/IGetUserDTO";
import { NotFoundError } from "../../../shared/errors/ApiError";
import { IUser } from "../domain/models/IUser";

@injectable()
export class FindUserService {
    constructor(
        @inject("UserRepository")
        private readonly userRepository: UserRepository
    ){}

    public async execute({id}: IGetUserDTO): Promise<IUser>{
        const user = await this.userRepository.find({id})
        if(!user){
            throw new NotFoundError("Usuário não encontrado.")
        }
        return user
    }
}