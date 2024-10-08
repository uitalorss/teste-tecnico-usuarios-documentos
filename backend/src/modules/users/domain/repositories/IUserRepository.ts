import { ICreateUserDTO } from "../models/DTO/ICreateUserDTO";
import { IUser } from "../models/IUser";


export interface IUserRepository {
    create({name, email}: ICreateUserDTO): Promise<IUser>
}