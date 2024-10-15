import { ICreateDocumentDTO } from "../models/DTO/ICreateDocument";
import { IGetDocumentRequestDTO } from "../models/DTO/IGetDocumentRequestDTO";
import { IUpdateDocumentDTO } from "../models/DTO/IUpdateDocumentDTO";
import { IDocument } from "../models/IDocument";


export interface IDocumentRepository {
    create({name, status, userId}: ICreateDocumentDTO): Promise<IDocument>
    find({documentId, userId}: IGetDocumentRequestDTO): Promise<IDocument | null>
    delete({documentId, userId}: IGetDocumentRequestDTO): Promise<void>;
    update({documentId, name, status}: IUpdateDocumentDTO): Promise<void>;
}