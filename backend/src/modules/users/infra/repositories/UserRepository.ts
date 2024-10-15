import { PrismaClient } from "@prisma/client";
import { ICreateUserDTO } from "../../domain/models/DTO/ICreateUserDTO";
import { IUser } from "../../domain/models/IUser";
import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { inject, injectable } from "tsyringe"
import { IGetUserDTO } from "../../domain/models/DTO/IGetUserDTO";
import { IDeleteUserDTO } from "../../domain/models/DTO/IDeleteUserDTO";
import { IUpdateUserDTO } from "../../domain/models/DTO/IUpdateUserDTORequest";
 

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

    async find({id}: IGetUserDTO): Promise<IUser | null>{
        const user = await this.prismaClient.user.findFirst({
            where: {
                id
            },
            include: {
                Document: true
            }
        })

        return user;
    }

    async findByEmail(email: string): Promise<IUser | null>{
        const user = await this.prismaClient.user.findFirst({
            where: {
                email
            }
        })
        
        return user
    }

    async update({ id, name, email }: IUpdateUserDTO): Promise<void> {
        await this.prismaClient.user.update({
            data: {
                name,
                email
            },
            where: {
                id
            }
        })
    }

    async delete({id}: IDeleteUserDTO): Promise<void> {
        await this.prismaClient.user.delete({
            where: {
                id
            }
        })
    }

}