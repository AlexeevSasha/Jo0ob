import {AnyAction, createSlice} from "@reduxjs/toolkit";
import {STATUS} from "../reduxType";
import {addJobThunk, byIdJobThunk, deleteJobThunk, editJobThunk, getAllJobThunk, staticAllJobThunk} from "../thunk/job";
import {IJobService, IStaticServer} from "../../api/job/jobDto";

interface IJob  {
    jobs: IJobService[] | [];
    job: IJobService | null;
    statistics: IStaticServer | null;
    status: STATUS;
}

const initialState : IJob = {
    jobs: [],
    job: null,
    statistics: null,
    status: STATUS.NEVER,
}

export const job = createSlice({
    name:'job',
    initialState,
    reducers: {
    },
    extraReducers: (builder => {
        //get jobs
        builder.addCase(getAllJobThunk.pending, (state) => {
            state.status = STATUS.LOADING
        })
        builder.addCase(getAllJobThunk.fulfilled, (state, {payload}) => {
            state.status = STATUS.LOADED;
            state.jobs = payload;
        })


        //get by id  jobs
        builder.addCase(byIdJobThunk.pending, (state) => {
            state.status = STATUS.LOADING
            state.job = null;
        })
        builder.addCase(byIdJobThunk.fulfilled, (state, {payload}) => {
            state.status = STATUS.LOADED;
            state.job = payload;
        })


        //add job
        builder.addCase(addJobThunk.pending, (state) => {
            state.status = STATUS.LOADING
        })
        builder.addCase(addJobThunk.fulfilled, (state) => {
            state.status = STATUS.LOADED;
        })


        //delete job
        builder.addCase(deleteJobThunk.pending, (state) => {
            state.status = STATUS.LOADING
        })
        builder.addCase(deleteJobThunk.fulfilled, (state, {payload}) => {
            state.status = STATUS.LOADED;
            state.jobs = state.jobs.filter(job => job.id !== payload.id)
        })

        //edit job
        builder.addCase(editJobThunk.pending, (state) => {
            state.status = STATUS.LOADING
        })
        builder.addCase(editJobThunk.fulfilled, (state) => {
            state.status = STATUS.LOADED;
        })

        //static all job
        builder.addCase(staticAllJobThunk.pending, (state) => {
            state.status = STATUS.LOADING
            state.statistics = null;
        })
        builder.addCase(staticAllJobThunk.fulfilled, (state, {payload}) => {
            state.status = STATUS.LOADED;
            state.statistics = payload;
        })

        builder.addMatcher(isError, (state) => {
            state.status = STATUS.ERROR
        })
    })
})


export default job.reducer

function isError(action: AnyAction) {
    return action.type.endsWith('rejected')
}