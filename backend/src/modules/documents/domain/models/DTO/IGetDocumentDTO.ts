import { IUser } from "../../../../users/domain/models/IUser";

export interface IGetDocumentDTO {
    id: string;
    name: string;
    status: string;
    userId: string;
}