import { inject, injectable } from "tsyringe";
import { UserRepository } from "../infra/repositories/UserRepository";
import { IGetUserDTO } from "../domain/models/DTO/IGetUserDTO";

@injectable()
export class FindUser {
    constructor(
        @inject("UserRepository")
        private readonly userRepository: UserRepository
    ){}

    public async execute({id}: IGetUserDTO){
        const user = await this.userRepository.find({id})
        return user
    }
}