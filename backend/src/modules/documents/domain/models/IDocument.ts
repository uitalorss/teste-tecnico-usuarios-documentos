import { IUser } from "../../../users/domain/models/IUser";


export interface IDocument {
    id: string;
    name: string;
    status: string | null;
    userId: string
}