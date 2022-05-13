import {Request, Response} from "express";

export const reqister = async (req: Request, res: Response) => {
    res.send('user register')
}

export const login = async (req: Request, res: Response) => {
    res.send('user login')
}

export const updateUser = async (req: Request, res: Response) => {
    res.send('user updateUser')
}