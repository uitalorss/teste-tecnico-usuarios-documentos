import { z } from "zod";


export const userSchema = z.object({
    name: z.string({required_error: "Campo Nome é obrigatório."}).trim().min(3, "Nome precisa ter mais de 2 caracteres.").max(50, "Nome precisa ser menor que 50 caracteres."),
    email: z.string({required_error: "Campo email é obrigatório"}).email("Favor informar um email válido.")
})

export const partialUserSchema = userSchema.partial();