import { container } from "tsyringe"
import { IUserRepository } from "../../modules/users/domain/repositories/IUserRepository"
import { UserRepository } from "../../modules/users/infra/repositories/UserRepository"
import "../database/prisma.symbol"
import { IDocumentRepository } from "../../modules/documents/domain/repositories/IDocumentRepository"
import { DocumentRepository } from "../../modules/documents/infra/repositories/DocumentRepository"

container.registerSingleton<IUserRepository>("UserRepository", UserRepository);
container.registerSingleton<IDocumentRepository>("DocumentRepository", DocumentRepository);