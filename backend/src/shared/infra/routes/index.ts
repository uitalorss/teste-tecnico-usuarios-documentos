import { Router } from "express";
import { userRoutes } from "../../../modules/users/infra/routes/user.routes";


export const router = Router();

router.use("/user", userRoutes)