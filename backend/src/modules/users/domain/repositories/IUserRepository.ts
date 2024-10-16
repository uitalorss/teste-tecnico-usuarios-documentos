import { ICreateUserDTO } from "../models/DTO/ICreateUserDTO";
import { IDeleteUserDTO } from "../models/DTO/IDeleteUserDTO";
import { IGetUserDTO } from "../models/DTO/IGetUserDTO";
import { IUpdateUserDTO } from "../models/DTO/IUpdateUserDTORequest";
import { IUser } from "../models/IUser";


export interface IUserRepository {
    create({name, email}: ICreateUserDTO): Promise<IUser>
    find({id}: IGetUserDTO): Promise<IUser | null>
    findByEmail(email: string): Promise<IUser | null>
    update({id, name, email}: IUpdateUserDTO): Promise<void>
    delete({id}: IDeleteUserDTO): Promise<void>
}