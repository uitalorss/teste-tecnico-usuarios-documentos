import { inject, injectable } from "tsyringe";
import { ICreateDocumentDTO } from "../../domain/models/DTO/ICreateDocument";
import { IGetDocumentRequestDTO } from "../../domain/models/DTO/IGetDocumentRequestDTO";
import { IDocument } from "../../domain/models/IDocument";
import { IDocumentRepository } from "../../domain/repositories/IDocumentRepository";
import { PrismaClient } from "@prisma/client";
import { IUpdateDocumentRequestDTO } from "../../domain/models/DTO/IUpdateDocumentRequestDTO";
import path from "path";
import fs from "fs";
import { v4 as uuidv4 } from 'uuid';
import { IUser } from "../../../users/domain/models/IUser";
import { IUpdateDocumentDTO } from "../../domain/models/DTO/IUpdateDocumentDTO";

const filepath = path.join(__dirname, "../../../../shared/database/db.json")


@injectable()
export class DocumentRepository implements IDocumentRepository {
    constructor(
        @inject("PrismaClient")
        private prismaClient: PrismaClient
    ){}

    private readfile() {
        const data = fs.readFileSync(filepath, "utf-8");
        return JSON.parse(data)
    }

    private writeFile(data: any): void {
        fs.writeFileSync(filepath, JSON.stringify(data, null, 2));
    }

    create({ name, status, userId }: ICreateDocumentDTO): IDocument {
        const db = this.readfile()

        const document = {
            id: uuidv4(),
            name,
            status,
            userId
        }

        const userIndex = db.users.findIndex((user: IUser) => user.id === userId);

        if(userIndex !== -1){
            db.users[userIndex].documents.push(document)
        }

        this.writeFile(db)

        return document
    }
    find({ documentId, userId }: IGetDocumentRequestDTO): IDocument | undefined {
        const db = this.readfile()
        
        const user = db.users.find((user: IUser) => user.id === userId);
        const documentData = user.documents.filter((document: IDocument) => document.id === documentId)
        const [document] = documentData;

        return document

    }

    async update({documentId, name, status, userId}: IUpdateDocumentDTO): Promise<void> {
        const db = this.readfile()
        
        const userIndex = db.users.findIndex((user: IUser) => user.id === userId);

        if(userIndex !== -1){
            const documentIndex = db.users[userIndex].documents.findIndex((document: IDocument) => document.id === documentId);
            if(documentIndex !== -1){
                db.users[userIndex].documents[documentIndex].name = name;
                db.users[userIndex].documents[documentIndex].status = status;
            }
        }
        this.writeFile(db)

    }

    async delete({documentId, userId}: IGetDocumentRequestDTO): Promise<void>{
        const db = this.readfile()
        
        const userIndex = db.users.findIndex((user: IUser) => user.id === userId);
        if(userIndex !== -1){
            const deleteDocument = db.users[userIndex].documents.filter((document: IDocument) => document.id !== documentId);
            db.users[userIndex].documents = deleteDocument
        }

        this.writeFile(db)
    }
}