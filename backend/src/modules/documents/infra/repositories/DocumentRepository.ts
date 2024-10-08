import { inject, injectable } from "tsyringe";
import { ICreateDocumentDTO } from "../../domain/models/DTO/ICreateDocument";
import { IGetDocumentRequestDTO } from "../../domain/models/DTO/IGetDocumentRequestDTO";
import { IDocument } from "../../domain/models/IDocument";
import { IDocumentRepository } from "../../domain/repositories/IDocumentRepository";
import { PrismaClient } from "@prisma/client";
import { IUpdateDocumentRequestDTO } from "../../domain/models/DTO/IUpdateDocumentRequestDTO";

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
    async find({ id }: IGetDocumentRequestDTO): Promise<IDocument | null> {
        const document = await this.prismaClient.document.findUnique({
            where: {
                id
            }
        })
        return document
    }

    async update({id, name, status}: IUpdateDocumentRequestDTO): Promise<void> {
        await this.prismaClient.document.update({
            where: {
                id
            },
            data: {
                name,
                status
            }
        })
    }

    async delete({id}: IGetDocumentRequestDTO): Promise<void>{
        await this.prismaClient.document.delete({
            where: {
                id
            }
        })
    }
}