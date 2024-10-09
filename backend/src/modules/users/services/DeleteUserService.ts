import { inject, injectable } from "tsyringe";
import { UserRepository } from "../infra/repositories/UserRepository";
import { IDeleteUserDTO } from "../domain/models/DTO/IDeleteUserDTO";
import { NotFoundError } from "../../../shared/errors/ApiError";

@injectable()
export class DeleteUserService {
    constructor(
        @inject("UserRepository")
        private readonly userRepository: UserRepository
    ){}

    public execute({id}: IDeleteUserDTO): void{
        const isUserExists = this.userRepository.find({id});
        if(!isUserExists){
            throw new NotFoundError("Usuário não encontrado.");
        }
        this.userRepository.delete({id})
    }
}