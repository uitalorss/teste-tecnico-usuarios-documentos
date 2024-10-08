import { inject, injectable } from "tsyringe";
import { UserRepository } from "../infra/repositories/UserRepository";

@injectable()
export class FindAllUsers {
    constructor(
        @inject("UserRepository")
        private readonly userRepository: UserRepository
    ){}

    public async execute(){
        const users = await this.userRepository.findAll()
        return users
    }
}