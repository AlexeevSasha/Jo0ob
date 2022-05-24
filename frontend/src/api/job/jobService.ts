import {IAddJob, Status, JobType, IJobService, IStaticServer} from "./jobDto";
import {post, get, remove, patch} from "../baseRequest";
import {getToken} from "../../utils/localStorage";


export const addJob = (data :  IAddJob<Status, JobType>) : Promise<IJobService[]> => {
    const token = getToken() as string;
    return post('/api/jobs', JSON.stringify(data), token)
}

export const getAllJob = () : Promise<IJobService[]> => {
    return get('/api/jobs')
}

export const getByIdJob = (id: string) : Promise<IJobService> => {
    const token = getToken() as string;
    return get(`/api/jobs/${id}`, token)
}

export const removeJob = (id: string) : Promise<IJobService> => {
    const token = getToken() as string;
    return remove(`/api/jobs/${id}`, token)
}

export const editJob = (id: string, data: IAddJob<Status, JobType>) : Promise<IJobService> => {
    const token = getToken() as string;
    return patch(`/api/jobs/${id}`,JSON.stringify(data) , token)
}


export const getStaticJob = () : Promise<IStaticServer> => {
    const token = getToken() as string;
    return get('/api/jobs/stats',  token)
}