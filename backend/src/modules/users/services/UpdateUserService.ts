import { inject, injectable } from "tsyringe";
import { UserRepository } from "../infra/repositories/UserRepository";
import { BadRequestError } from "../../../shared/errors/ApiError";
import { IUpdateUserDTO } from "../domain/models/DTO/IUpdateUserDTORequest";

@injectable()
export class UpdateUserService {
    constructor(
        @inject("UserRepository")
        private readonly userRepository: UserRepository
    ){}

    public execute({id, name, email}: IUpdateUserDTO){
        const userToUpdate = this.userRepository.find({id});
        if(!userToUpdate){
            throw new BadRequestError("Usuário inválido!");
        }

        const emailAlreadyInUse = this.userRepository.findByEmail(email);
        if(emailAlreadyInUse && emailAlreadyInUse.email !== userToUpdate.email){
            throw new BadRequestError("Email já em uso.");
        }

        this.userRepository.update({id, name, email});
    }
}