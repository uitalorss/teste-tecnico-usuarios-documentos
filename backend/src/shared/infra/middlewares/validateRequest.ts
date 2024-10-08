import { NextFunction, Request, Response } from "express";
import { z } from "zod";
import { BadRequestError } from "../../errors/ApiError";


export const validateRequest = (schema: z.AnyZodObject | z.ZodOptional<z.AnyZodObject>) => async(req: Request, res: Response, next: NextFunction) => {
    try {
        await schema.parseAsync(req.body);
        next();
    } catch (error) {
        const err = error;
        if(err instanceof z.ZodError){
            const {issues} = err
            throw new BadRequestError(issues[0].message)
        }
    }
}