import { Router } from "express";
import { userRoutes } from "../../../modules/users/infra/routes/user.routes";
import { sessionRoutes } from "../../../modules/users/infra/routes/session.routes";
import { documentRoutes } from "../../../modules/documents/infra/routes/document.routes";


export const router = Router();

router.use("/user", userRoutes)
router.use("/login", sessionRoutes)
router.use("/document", documentRoutes)