import { Router } from "express";
import { DocumentController } from "../controllers/DocumentController";
import { handleAuthentication } from "../../../../shared/infra/middlewares/handleAuthentication";
import { documentSchema, partialDocumentSchema } from "../../domain/schemas/documentSchema";
import { validateRequest } from "../../../../shared/infra/middlewares/validateRequest";



export const documentRoutes = Router();
const documentController = new DocumentController();

documentRoutes.use(handleAuthentication)

documentRoutes.post("/", validateRequest(documentSchema), documentController.create)
documentRoutes.get("/:id_document", documentController.show)
documentRoutes.delete("/:id_document", documentController.delete)
documentRoutes.put("/:id_document", validateRequest(partialDocumentSchema), documentController.update)