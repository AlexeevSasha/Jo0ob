import {Request, Response} from "express";


export const getAllJob = async (req: Request, res: Response) => {
    res.send('job getAllJob')
}
export const createJob = async (req: Request, res: Response) => {
    res.send('job createJob')
}

export const updateJob = async (req: Request, res: Response) => {
    res.send('job updateJob')
}

export const deleteJob = async (req: Request, res: Response) => {
    res.send('job deleteJob')
}

export const showStats = async (req: Request, res: Response) => {
    res.send('job showStats')
}

