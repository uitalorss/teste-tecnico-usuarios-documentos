import { inject, injectable } from "tsyringe";
import { DocumentRepository } from "../infra/repositories/DocumentRepository";
import { IGetDocumentRequestDTO } from "../domain/models/DTO/IGetDocumentRequestDTO";
import { NotFoundError } from "../../../shared/errors/ApiError";
import { IDocument } from "../domain/models/IDocument";

@injectable()
export class FindDocumentService {
    constructor(
        @inject("DocumentRepository")
        private readonly documentRepository: DocumentRepository
    ){}

    public execute({documentId, userId}: IGetDocumentRequestDTO): IDocument{
        const document = this.documentRepository.find({documentId, userId})
        if(!document){
            throw new NotFoundError("Documento não encontrado.")
        }
        return document
    }
}