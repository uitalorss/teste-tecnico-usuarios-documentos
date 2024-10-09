import { ICreateUserDTO } from "../models/DTO/ICreateUserDTO";
import { IDeleteUserDTO } from "../models/DTO/IDeleteUserDTO";
import { IGetUserDTO } from "../models/DTO/IGetUserDTO";
import { IUpdateUserDTO } from "../models/DTO/IUpdateUserDTORequest";
import { IUser } from "../models/IUser";


export interface IUserRepository {
    create({name, email}: ICreateUserDTO): IUser
    find({id}: IGetUserDTO): IUser | undefined
    findByEmail(email: string): IUser | undefined
    update({id, name, email}: IUpdateUserDTO): void
    delete({id}: IDeleteUserDTO): void
}