import {Request, Response, NextFunction} from "express";
import {StatusCodes} from 'http-status-codes'
import User, {IUser} from '../models/User'
import { Types } from 'mongoose';
import {BadRequestError, UnauthenticatedError} from "../error";



const userObj = (user: IUser & { _id: Types.ObjectId }, token: string) => {
    return {
        user: {
            id: user._id,
            email: user.email,
            lastName: user.lastName,
            location: user.location,
            name: user.name,
        },
        token
    }
}

export const reqister = async (req: Request<{}, {}, IUser>, res: Response, next: NextFunction) => {
    try {
        const {email, name, password} = req.body;
        if (!email || !name || !password) {
            throw new BadRequestError('Please provide all values')
        }

        const userAlreadyExist = await User.findOne({email})
        if (userAlreadyExist) {
            throw new BadRequestError('Email already in use')
        }

        const user = await User.create(req.body)
        const token = user.createJWT();

        res.status(StatusCodes.CREATED).json(userObj(user, token))
    } catch (error) {
        next(error)
    }
}

export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {email, password} = req.body as { email?: string, password?: string };
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

        res.status(StatusCodes.OK).json(userObj(user, token))
    } catch (error) {
        next(error)
    }
}

export const updateUser = async (req: Request<{}, {}, IUser>, res: Response) => {
    const {email, name, lastName, location} = req.body;
    if (!email && !name && !lastName && !location) {
        throw new BadRequestError('Please provide  value')
    }
    const user = await User.findOne({_id: req.user.userId})

    if (!user) {
        throw new BadRequestError('User does not exist')
    }
    if (email) user.email = email;
    if (name) user.name = name;
    if (lastName) user.lastName = lastName;
    if (location) user.location = location;

     await user.save();
     const token = user.createJWT()

    res.status(StatusCodes.OK).json(userObj(user, token))
}