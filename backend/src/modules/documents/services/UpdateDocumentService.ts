import { inject, injectable } from "tsyringe";
import { DocumentRepository } from "../infra/repositories/DocumentRepository";
import { IUpdateDocumentDTO } from "../domain/models/DTO/IUpdateDocumentDTO";
import { BadRequestError, NotFoundError } from "../../../shared/errors/ApiError";

@injectable()
export class UpdateDocumentService {
    constructor(
        @inject("DocumentRepository")
        private readonly documentRepository: DocumentRepository
    ){}

    public async execute({userId, id, name, status}: IUpdateDocumentDTO): Promise<void> {
        const document = await this.documentRepository.find({id})
        if(!document){
            throw new NotFoundError("Documento não existe.")
        }

        if(document.userId !== userId){
            throw new BadRequestError("Não é possível excluir um documento que não é seu.")
        }

        await this.documentRepository.update({id, name, status})
    }
}