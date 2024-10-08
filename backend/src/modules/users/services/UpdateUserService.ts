import { inject, injectable } from "tsyringe";
import { UserRepository } from "../infra/repositories/UserRepository";
import { IUpdateUser } from "../domain/models/DTO/IUpdateUserDTO";
import { BadRequestError } from "../../../shared/errors/ApiError";

@injectable()
export class UpdateUserService {
    constructor(
        @inject("UserRepository")
        private readonly userRepository: UserRepository
    ){}

    public async execute({id, name, email}: IUpdateUser){
        const userToUpdate = await this.userRepository.find({id});
        if(!userToUpdate){
            throw new BadRequestError("Usuário inválido!");
        }

        const emailAlreadyInUse = await this.userRepository.findByEmail(email);
        if(emailAlreadyInUse && emailAlreadyInUse.email !== userToUpdate.email){
            throw new BadRequestError("Email já em uso.");
        }

        await this.userRepository.update({id, name, email});
    }
}