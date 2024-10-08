import { IDocument } from "../../../documents/domain/models/IDocument";

export interface IUser {
    id: string;
    name: string;
    email: string;
    documents?: IDocument[]
}