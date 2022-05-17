import {Response, Request, NextFunction, ErrorRequestHandler} from 'express'
import {Error } from 'mongoose';
import {MongoError} from 'mongodb';
import {StatusCodes} from 'http-status-codes'

interface CustomError extends Error {
    statusCode?: number;
}

export const errorHandlerMiddleware = (error: CustomError, req: Request, res: Response, next: NextFunction) => {
    const defaultError = {
        statusCode: error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        msg: error.message || 'Something went wrong, try again later'
    }
    if (error instanceof Error.ValidationError) {
        defaultError.statusCode = StatusCodes.BAD_REQUEST
        defaultError.msg = Object.values(error.errors)
            .map((item: any) => item.message)
            .join(',')
    }
    if ((error as MongoError).code === 11000) {
        defaultError.statusCode = StatusCodes.BAD_REQUEST
        //@ts-ignore
        defaultError.msg = `${Object.keys(error.keyValue)} field has to be unique`
    }
    res.status(defaultError.statusCode).json({msg: defaultError.msg})
}