import { injectable, inject } from "tsyringe"
import { IUserRepository } from "../domain/repositories/IUserRepository";
import { ICreateUserDTO } from "../domain/models/DTO/ICreateUserDTO";
import { IUser } from "../domain/models/IUser";
import { BadRequestError } from "../../../shared/errors/ApiError";


@injectable()
export class CreateUserService {
    constructor(
        @inject("UserRepository")
        private readonly userRepository: IUserRepository
    ){}
    public execute({name, email}: ICreateUserDTO): IUser {
        const isEmailExists = this.userRepository.findByEmail(email);
        if(isEmailExists){
            throw new BadRequestError("Email já cadastrado.")
        }

        const user = this.userRepository.create({name, email});
        return user
    }
}