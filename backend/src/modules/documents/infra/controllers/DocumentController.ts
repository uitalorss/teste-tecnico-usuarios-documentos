import {Request, Response} from "express"
import { container } from "tsyringe";
import { CreateDocumentService } from "../../services/CreateDocumentService";
import { FindDocumentService } from "../../services/FindDocumentService";
import { DeleteDocumentService } from "../../services/DeleteDocumentService";
import { UpdateDocumentService } from "../../services/UpdateDocumentService";

export class DocumentController {
    public create(req: Request, res: Response){
        const {name, status} = req.body;
        const {id} = req.user;
        const createDocumentService = container.resolve(CreateDocumentService)
        const document = createDocumentService.execute({name, status, userId: id});
        res.status(201).json(document)
    }

    public show(req: Request, res: Response){
        const {id_document} = req.params;
        const {id} = req.user
        const findDocumentService = container.resolve(FindDocumentService);
        const document = findDocumentService.execute({documentId: id_document, userId: id})
        res.json(document);
    }

    public async update(req: Request, res: Response){
        const {id_document} = req.params;
        const {id} = req.user;
        const {name, status} = req.body;
        const updateDocumentService = container.resolve(UpdateDocumentService);
        await updateDocumentService.execute({userId: id, documentId: id_document, name, status})
        res.status(204).send()
    }

    public async delete (req: Request, res: Response){
        const {id_document} = req.params;
        const {id} = req.user;
        const deleteDocumentService = container.resolve(DeleteDocumentService);
        await deleteDocumentService.execute({userId: id, documentId: id_document});
        res.status(204).send()
    }


}