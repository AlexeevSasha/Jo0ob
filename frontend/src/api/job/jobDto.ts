export type Status = 'interview' | 'declined' | 'pending';
export type JobType = 'full-time' | 'part-time' | 'remote' | 'internship';
export type ISortFilter = 'latest' | 'oldest' | 'a-z' | 'z-a'

export interface ISelect<T> {
    value: T;
    label: string
}

export interface IAddJob<T, X> {
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

export interface IMonthlyApplication {
    date: string;
    count: number
}

export interface Stats {
    declined: number,
    pending: number,
    interview: number
}

export interface IStaticServer {
    stats: Stats
    monthly: IMonthlyApplication[]
}

export interface IFilter {
    status?: Status | 'all',
    type?: JobType | 'all',
    sort?: ISortFilter
}


