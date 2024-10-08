import { inject, injectable } from "tsyringe";
import { DocumentRepository } from "../infra/repositories/DocumentRepository";
import { IGetDocumentRequestDTO } from "../domain/models/DTO/IGetDocumentRequestDTO";
import { UserRepository } from "../../users/infra/repositories/UserRepository";
import { IDeleteDocumentDTO } from "../domain/models/DTO/IDeleteUserDTO";
import { BadRequestError, NotFoundError } from "../../../shared/errors/ApiError";

@injectable()
export class DeleteDocumentService {
    constructor(
       @inject("DocumentRepository")
       private readonly documentRepository: DocumentRepository,
    ){}

    public async execute({userId, documentId}: IDeleteDocumentDTO): Promise<void>{
        const document = await this.documentRepository.find({id: documentId});
        if(!document){
            throw new NotFoundError("Documento não existe.")
        }

        if(document.userId !== userId){
            throw new BadRequestError("Não é possível excluir um documento que não é seu.")
        }

        await this.documentRepository.delete({id: documentId})
    }

}