import {ISelect, ISortFilter, JobType, Status} from "../api/job/jobDto";


export const statusOption : ISelect<Status>[] = [
    {value: 'pending', label: 'Pending'},
    {value: 'interview', label: 'Interview'},
    {value: 'declined', label: 'Declined'}
]

export const jobType : ISelect<JobType>[] = [
    {value: 'full-time', label: 'Full-time'},
    {value: 'part-time', label: 'Part-time'},
    {value: 'remote', label: 'Remote'},
    {value: 'internship', label: 'Internship'}
]

//Filter

export const sortFilter : ISelect<ISortFilter>[] = [
    {value: 'latest', label: 'Latest'},
    {value: 'oldest', label: 'Oldest'},
    {value: 'a-z', label: 'a-z'},
    {value: 'z-a', label: 'z-a'}
]

export const statusFilter : ISelect<Status | 'all'>[] = [
    {value: 'all', label: 'All'},
    ...statusOption,
]

export const typeFilter :  ISelect<JobType | 'all'>[] = [
    {value: 'all', label: 'All'},
    ...jobType,
]







