import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { handleAuthentication } from "../../../../shared/infra/middlewares/handleAuthentication";


export const userRoutes = Router();
const userController = new UserController();

userRoutes.post("/", userController.create);
userRoutes.use(handleAuthentication)

userRoutes.get("/", userController.show);
userRoutes.put("/", userController.update);
userRoutes.delete("/", userController.delete);