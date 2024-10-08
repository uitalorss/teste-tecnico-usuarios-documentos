import { PrismaClient } from "@prisma/client";
import { ICreateUserDTO } from "../../domain/models/DTO/ICreateUserDTO";
import { IUser } from "../../domain/models/IUser";
import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { inject, injectable } from "tsyringe"
import { IGetUserDTO } from "../../domain/models/DTO/IGetUserDTO";
import { IUpdateUser } from "../../domain/models/DTO/IUpdateUserDTO";
import { IDeleteUserDTO } from "../../domain/models/DTO/IDeleteUserDTO";

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

    async findAll(): Promise<IUser[]>{
        const users = await this.prismaClient.user.findMany()
        return users
    }

    async find({id}: IGetUserDTO): Promise<IUser | null>{
        const user = await this.prismaClient.user.findUnique({
            where: {
                id 
            }
        })
        return user;
    }

    async findByEmail(email: string){
        const user = await this.prismaClient.user.findUnique({
            where: {
                email
            }
        })
        return user
    }

    async update({ id, name, email }: IUpdateUser): Promise<void> {
        await this.prismaClient.user.update({
            where: {
                id
            },
            data: {
                name,
                email
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