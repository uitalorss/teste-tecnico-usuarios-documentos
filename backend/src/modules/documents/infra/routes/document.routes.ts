import { Router } from "express";
import { DocumentController } from "../controllers/DocumentController";
import { handleAuthentication } from "../../../../shared/infra/middlewares/handleAuthentication";



export const documentRoutes = Router();
const documentController = new DocumentController();

documentRoutes.use(handleAuthentication)

documentRoutes.post("/", documentController.create)
documentRoutes.get("/:id_document", documentController.show)
documentRoutes.delete("/:id_document", documentController.delete)
documentRoutes.put("/:id_document", documentController.update)