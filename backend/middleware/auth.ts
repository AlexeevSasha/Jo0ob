import {NextFunction, Request, Response} from "express";
import {UnauthenticatedError} from "../error";
import jwt, {JwtPayload} from "jsonwebtoken";

interface UserPayload extends JwtPayload {
    userId: string;
}

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const authorization = req.headers.authorization;
    if (!authorization || !authorization.startsWith('Bearer')) {
        throw  new UnauthenticatedError('Authentication invalid')
    }
    const token = authorization.split(' ')[1];


    try {
        const payload = jwt.verify(token, String(process.env.JWT_SECRET)) as UserPayload
         req.user = {userId: payload.userId};
        next()
    } catch (error) {
        console.log(error)
        throw  new UnauthenticatedError('Authentication invalid')
    }
}