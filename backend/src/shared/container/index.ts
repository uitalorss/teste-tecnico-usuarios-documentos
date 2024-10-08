import { container } from "tsyringe"
import { IUserRepository } from "../../modules/users/domain/repositories/IUserRepository"
import { UserRepository } from "../../modules/users/infra/repositories/UserRepository"
import "../database/prisma.symbol"

container.registerSingleton<IUserRepository>("UserRepository", UserRepository)