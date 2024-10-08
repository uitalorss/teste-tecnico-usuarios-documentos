import { ICreateDocumentDTO } from "../models/DTO/ICreateDocument";
import { IGetDocumentRequestDTO } from "../models/DTO/IGetDocumentRequestDTO";
import { IUpdateDocumentRequestDTO } from "../models/DTO/IUpdateDocumentRequestDTO";
import { IDocument } from "../models/IDocument";


export interface IDocumentRepository {
    create({name, status, userId}: ICreateDocumentDTO): Promise<IDocument>
    find({id}: IGetDocumentRequestDTO): Promise<IDocument | null>
    delete({id}: IGetDocumentRequestDTO): Promise<void>;
    update({id, name, status}: IUpdateDocumentRequestDTO): Promise<void>;
}