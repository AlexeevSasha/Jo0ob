import {createAsyncThunk} from '@reduxjs/toolkit'
import {IAddJob, IJobService, IStaticServer, JobType, Status} from "../../api/job/jobDto";
import {addJob, editJob, getAllJob, getByIdJob, getStaticJob, removeJob} from "../../api/job/jobService";
import {successNotification} from "../../utils/notification";



export const addJobThunk = createAsyncThunk<IJobService[],  {data: IAddJob<Status, JobType>, cb: () => void}>(
    'job/fetchCreateJob',
    async ({data, cb}) => {
        const response: IJobService[] =  await addJob(data)
        cb()
        return response
    }
)

export const getAllJobThunk = createAsyncThunk<IJobService[]>(
    'job/fetchAllJob',
    async () => {
        const response: IJobService[] =  await getAllJob()
        return response
    }
)

export const byIdJobThunk = createAsyncThunk<IJobService,  string>(
    'job/fetchByIdJob',
    async (id) => {
        const response: IJobService =  await getByIdJob(id)
        return response
    }
)

export const deleteJobThunk = createAsyncThunk<IJobService,  string>(
    'job/fetchDeleteJob',
    async (id) => {
        const response: IJobService =  await removeJob(id)
        successNotification('Job removed')
        return response
    }
)

export const editJobThunk = createAsyncThunk<IJobService,  {id: string, data: IAddJob<Status, JobType>, cb: () => void}>(
    'job/fetchEditJob',
    async ({id, data, cb}) => {
        const response: IJobService =  await editJob(id, data)
        cb()
        successNotification('Job edited')
        return response
    }
)



export const staticAllJobThunk = createAsyncThunk<IStaticServer>(
    'job/fetchStaticJob',
    async () => {
        const response: IStaticServer =  await getStaticJob()
        return response
    }
)


