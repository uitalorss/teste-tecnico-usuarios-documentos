import { ICreateDocumentDTO } from "../models/DTO/ICreateDocument";
import { IGetDocumentRequestDTO } from "../models/DTO/IGetDocumentRequestDTO";
import { IUpdateDocumentDTO } from "../models/DTO/IUpdateDocumentDTO";
import { IDocument } from "../models/IDocument";


export interface IDocumentRepository {
    create({name, status, userId}: ICreateDocumentDTO): IDocument
    find({documentId, userId}: IGetDocumentRequestDTO): IDocument | undefined
    delete({documentId, userId}: IGetDocumentRequestDTO): void;
    update({documentId, name, status}: IUpdateDocumentDTO): void;
}