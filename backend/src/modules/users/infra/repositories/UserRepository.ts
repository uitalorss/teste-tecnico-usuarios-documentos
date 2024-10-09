import { PrismaClient } from "@prisma/client";
import { ICreateUserDTO } from "../../domain/models/DTO/ICreateUserDTO";
import { IUser } from "../../domain/models/IUser";
import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { inject, injectable } from "tsyringe"
import { IGetUserDTO } from "../../domain/models/DTO/IGetUserDTO";
import { IDeleteUserDTO } from "../../domain/models/DTO/IDeleteUserDTO";
import path from "path";
import fs from "fs";
import { v4 as uuidv4 } from 'uuid';
import { IUpdateUserDTO } from "../../domain/models/DTO/IUpdateUserDTORequest";
 

const filepath = path.join(__dirname, "../../../../shared/database/db.json");

@injectable()
export class UserRepository implements IUserRepository {
    constructor(
        @inject("PrismaClient")
        private prismaClient: PrismaClient
    ){}

    private readfile() {
        const data = fs.readFileSync(filepath, "utf-8");
        return JSON.parse(data)
    }

    private writeFile(data: any): void {
        fs.writeFileSync(filepath, JSON.stringify(data, null, 2));
    }

    create({ name, email }: ICreateUserDTO): IUser {
        const db = this.readfile()
        
        const user = {
            id: uuidv4(),
            name,
            email,
            documents: []
        }

        db.users.push(user)
        this.writeFile(db)
        return user;
    }

    find({id}: IGetUserDTO): IUser | undefined{
        const db = this.readfile()
        const user = db.users.find((user: IUser) => user.id === id)

        return user

    }

    findByEmail(email: string): IUser | undefined{
        const db = this.readfile()

        const user = db.users.find((user: IUser) => user.email === email)

        return user
    }

    update({ id, name, email }: IUpdateUserDTO): void {
        const db = this.readfile()
        const userIndex = db.users.findIndex((user: IUser) => user.id === id);

        if(userIndex !== -1){
            db.users[userIndex].name = name;
            db.users[userIndex].email = email
        }

        this.writeFile(db)
    }

    delete({id}: IDeleteUserDTO): void {
        const db = this.readfile()

        const deleteUser = db.users.filter((user: IUser) => user.id !== id)

        db.users = deleteUser

        this.writeFile(db)
    }

}