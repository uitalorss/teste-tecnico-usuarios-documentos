import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { handleAuthentication } from "../../../../shared/infra/middlewares/handleAuthentication";
import { validateRequest } from "../../../../shared/infra/middlewares/validateRequest";
import { partialUserSchema, userSchema } from "../../domain/schemas/userSchema";


export const userRoutes = Router();
const userController = new UserController();

userRoutes.post("/", validateRequest(userSchema), userController.create);
userRoutes.use(handleAuthentication)

userRoutes.get("/", userController.show);
userRoutes.put("/", validateRequest(partialUserSchema), userController.update);
userRoutes.delete("/", userController.delete);