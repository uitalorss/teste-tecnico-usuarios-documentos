import { ICreateUserDTO } from "../models/DTO/ICreateUserDTO";
import { IGetUserDTO } from "../models/DTO/IGetUserDTO";
import { IUser } from "../models/IUser";


export interface IUserRepository {
    create({name, email}: ICreateUserDTO): Promise<IUser>
    findAll(): Promise<IUser[]>
    find({id}: IGetUserDTO): Promise<IUser | null>
    findByEmail(email: string): Promise<IUser | null>
}