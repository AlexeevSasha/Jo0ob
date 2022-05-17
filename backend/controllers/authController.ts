import {Request, Response, NextFunction} from "express";
import {StatusCodes} from 'http-status-codes'
import User, {IUser} from '../models/User'
import {BadRequestError, UnauthenticatedError} from "../error";

export const reqister = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {email, name, password} = req.body as IUser;
        if (!email || !name || !password) {
            throw new BadRequestError('Please provide all values')
        }

        const userAlreadyExist = await User.findOne({email})
        if (userAlreadyExist) {
            throw new BadRequestError('Email already in use')
        }

        const user = await  User.create({email, name, password})
        const token = user.createJWT();

        res.status(StatusCodes.CREATED).json({
            user: {
                email: user.email,
                name: user.name,
                lastName: user.lastName,
                location: user.location
            },
            token,
            location: user.location
        })
    } catch (error) {
        next(error)
    }
}

export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {email, password} = req.body as {email: string, password: string};
        if (!email || !password) {
            throw new BadRequestError('Please provide all values')
        }
        const user = await User.findOne({email}).select('+password')
        if (!user) {
            throw new UnauthenticatedError('Invalid email')
        }
       const isPasswordCorrect = await user.comparePassword(password)
        if (!isPasswordCorrect) {
            throw new UnauthenticatedError('Invalid password')
        }
        const token = user.createJWT()

        res.status(StatusCodes.OK).json({
            user : {
                email: user.email,
                name: user.name,
                lastName: user.lastName,
                location: user.location
            },
            token,
            location: user.location})
    } catch (error) {
        next(error)
    }
}

export const updateUser = async (req: Request, res: Response) => {
    res.send('user updateUser')
    // user.findOneAndUpdate()
}