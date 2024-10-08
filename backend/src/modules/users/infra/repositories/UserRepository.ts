import { PrismaClient } from "@prisma/client";
import { ICreateUserDTO } from "../../domain/models/DTO/ICreateUserDTO";
import { IUser } from "../../domain/models/IUser";
import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { inject, injectable } from "tsyringe"

@injectable()
export class UserRepository implements IUserRepository {
    constructor(
        @inject("PrismaClient")
        private prismaClient: PrismaClient
    ){}
    async create({ name, email }: ICreateUserDTO): Promise<IUser> {
        const user = await this.prismaClient.user.create({
            data: {
                name,
                email
            }
        })
        return user;
    }

}