import { NextFunction, Request, Response } from "express";
import { ApiError } from "../../errors/ApiError";
import { verify } from "jsonwebtoken";


interface IToken{
    id: string;
    iat: string;
    exp: string;
}

export const handleAuthentication = (req: Request, res: Response, next: NextFunction) => {
    const {authorization} = req.headers;
    console.log(authorization)
    if(!authorization) {
        throw new ApiError("Token não informado", 401)
    }

    try {
        const token = authorization.replace("Bearer ", "");
        const decodedToken = verify(token, process.env.JWT_KEY!);

        const {id} = decodedToken as unknown as IToken
        req.user = {
            id,
        }
        next();
    } catch (error) {
        throw new ApiError("Token inválido", 401)
    }
}