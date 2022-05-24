
export type Status = 'interview' | 'declined' | 'pending';
export type JobType = 'full-time' | 'part-time' | 'remote' | 'internship';

export interface ISelect<T> {
    value: T;
    label: string
}


export interface IAddJob<T, X>{
    position: string;
    company: string;
    location?: string;
    status: T
    type: X
}

export interface IJobService extends IAddJob<Status, JobType> {
    id: string;
    createBy: string
    createdAt: string;
    updatedAt?: string
}

export interface IStaticServer {
    declined: number,
    pending: number,
    interview: number
}