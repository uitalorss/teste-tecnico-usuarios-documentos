import { z } from "zod";


export const documentSchema = z.object({
    name: z.string({required_error: "Campo nome é obrigatório."}).trim().min(3, "Nome precisa ter mais de 2 caracteres.").max(50, "Nome precisa ser menor que 50 caracteres."),
    status: z.enum(["Não assinado", "Parcialmente assinado", "Assinado"], {required_error: "Campo status é obrigatório", message: "Favor usar as opções corretas."})
})

export const partialDocumentSchema = documentSchema.partial();