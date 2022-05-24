import {Request, Response} from "express";
import Job, {IJob} from "../models/Job";
import {Types} from "mongoose";
import {BadRequestError, NotFoundError} from "../error";
import {StatusCodes} from "http-status-codes";
import {checkPermissions} from "../utils/checkPermisions";


export const getAllJob = async (req: Request<{ id: string }>, res: Response) => {
    const allJob = await Job.find({})
    res.status(StatusCodes.CREATED).json(allJob)
}
export const getByIdJob = async (req: Request, res: Response) => {
    const {id} = req.params;
    const job = await Job.findOne({_id: id})
    if (!job) {
        throw new NotFoundError(`No job with id: ${id}`)
    }
    res.status(StatusCodes.CREATED).json(job)
}

export const createJob = async (req: Request<{}, {}, IJob>, res: Response) => {
    const {position, company} = req.body
    if (!position || !company) {
        throw new BadRequestError('Please provide all values')
    }
    req.body.createBy = new Types.ObjectId(req.user.userId);
    const job = await Job.create(req.body)
    res.status(StatusCodes.OK).json(job)
}

export const updateJob = async (req: Request<{ id: string }, {}, IJob>, res: Response) => {
    const {id: jobId} = req.params;
    const {position, company} = req.body;
    if (!position || !company) {
        throw new BadRequestError('Please provide all values')
    }

    const job = await Job.findOne({_id: jobId})
    if (!job) {
        throw new NotFoundError(`No job with id: ${jobId}`)
    }

    checkPermissions(req.user, job.createBy)
    const updateJob = await Job.findOneAndUpdate({_id: jobId}, req.body, {
        new: true,
        runValidators: true
    })
    res.status(StatusCodes.OK).json(updateJob)
}

export const deleteJob = async (req: Request<{ id: string }, {}, IJob>, res: Response) => {
    const {id: jobId} = req.params;
    const job = await Job.findOne({_id: jobId})
    if (!job) {
        throw new NotFoundError(`No job with id: ${jobId}`)
    }
    checkPermissions(req.user, job.createBy)

    await job.remove()
    res.status(StatusCodes.OK).json(job)
}

export const showStats = async (req: Request, res: Response) => {
    const stats = await Job.aggregate([
        {$match: {createBy: new Types.ObjectId(req.user.userId)}},
        {$group: {_id: '$status', count: {$sum: 1}}}
    ])
    const statusObj = stats.reduce((acc, curr) => {
        acc[curr._id] = curr.count || 0
        return acc;
    }, {})

    const defaultStats = {
        "declined": statusObj.declined || 0,
        "pending": statusObj.pending || 0,
        "interview": statusObj.interview || 0
    }

    res.status(StatusCodes.OK).json(defaultStats)
}

