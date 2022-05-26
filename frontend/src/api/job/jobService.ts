import {IAddJob, Status, JobType, IJobService, IStaticServer, IFilter} from "./jobDto";
import {post, get, remove, patch} from "../baseRequest";
import {getToken} from "../../utils/localStorage";

export const addJob = (data :  IAddJob<Status, JobType>) : Promise<IJobService[]> => {
    const token = getToken() as string;
    return post('/api/jobs', JSON.stringify(data), token)
}

export const getAllJob = (filter?: IFilter , search?: string) : Promise<IJobService[]> => {
    let url = '/api/jobs'
    if (!filter && !search) return get(url)
    if (search) {
        url += `?search=${search}`
        return get(url)
    }
    const { sort, type, status} = filter as IFilter;
    url += `?status=${status}&type=${type}&sort=&${sort}`
    return get(url)
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