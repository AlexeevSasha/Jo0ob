import { Response, Request, NextFunction } from 'express'

interface Error {
    status?: number;
    message?: string;
}

export const errorHandlerMiddleware = (err : Error, req: Request, res: Response, next: NextFunction) => {
    console.log(err)
    res.status(500).json({message: 'there was an error'})
}