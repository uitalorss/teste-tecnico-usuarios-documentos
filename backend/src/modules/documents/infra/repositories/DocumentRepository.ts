import { inject, injectable } from "tsyringe";
import { ICreateDocumentDTO } from "../../domain/models/DTO/ICreateDocument";
import { IGetDocumentRequestDTO } from "../../domain/models/DTO/IGetDocumentRequestDTO";
import { IDocument } from "../../domain/models/IDocument";
import { IDocumentRepository } from "../../domain/repositories/IDocumentRepository";
import { PrismaClient } from "@prisma/client";
import { IUpdateDocumentDTO } from "../../domain/models/DTO/IUpdateDocumentDTO";

@injectable()
export class DocumentRepository implements IDocumentRepository {
    constructor(
        @inject("PrismaClient")
        private prismaClient: PrismaClient
    ){}

    async create({ name, status, userId }: ICreateDocumentDTO): Promise<IDocument> {
        const document = await this.prismaClient.document.create({
            data: {
                name,
                status,
                userId
            }
        })

        return document
    }

    async find({ documentId, userId }: IGetDocumentRequestDTO): Promise<IDocument | null> {
        const document = await this.prismaClient.document.findFirst({
            where: {
                id: documentId,
                userId
            }
        })

        return document

    }

    async update({documentId, name, status, userId}: IUpdateDocumentDTO): Promise<void> {
        await this.prismaClient.document.update({
            data: {
                name,
                status
            },
            where: {
                id: documentId,
                userId
            }
        })
    }

    async delete({documentId, userId}: IGetDocumentRequestDTO): Promise<void>{
        await this.prismaClient.document.delete({
            where: {
                id: documentId,
                userId
            }
        })
    }
}