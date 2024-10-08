import { injectable, inject } from "tsyringe"
import { IUserRepository } from "../domain/repositories/IUserRepository";
import { ICreateUserDTO } from "../domain/models/DTO/ICreateUserDTO";
import { IUser } from "../domain/models/IUser";


@injectable()
export class CreateUserService {
    constructor(
        @inject("UserRepository")
        private readonly userRepository: IUserRepository
    ){}
    public async execute({name, email}: ICreateUserDTO): Promise<IUser> {
        try {
            const user = await this.userRepository.create({name, email});
            return user
        } catch (error) {
            throw new Error(`${error}`)
        }
    }
}