import { inject, injectable } from "tsyringe";
import { DocumentRepository } from "../infra/repositories/DocumentRepository";
import { ICreateDocumentDTO } from "../domain/models/DTO/ICreateDocument";
import { UserRepository } from "../../users/infra/repositories/UserRepository";

@injectable()
export class CreateDocumentService {
    constructor(
        @inject("DocumentRepository")
        private readonly documentRepository: DocumentRepository,
    ){}

    public async execute({name, status, userId}: ICreateDocumentDTO){
        const document = await this.documentRepository.create({name, status, userId})
        return document
    }
}