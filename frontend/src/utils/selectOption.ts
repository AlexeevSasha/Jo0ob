import {ISelect, JobType, Status} from "../api/job/jobDto";


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


