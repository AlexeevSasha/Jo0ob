import { createSlice} from "@reduxjs/toolkit";
import {STATUS} from "../reduxType";
import {addJobThunk, byIdJobThunk, deleteJobThunk, editJobThunk, getAllJobThunk, staticAllJobThunk} from "../thunk/job";
import {IJobService, IStaticServer} from "../../api/job/jobDto";




interface IJob  {
    jobs: IJobService[] | [];
    job: IJobService | null;
    stats: IStaticServer | null;
    status: STATUS;
}

const initialState : IJob = {
    jobs: [],
    job: null,
    stats: null,
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
        builder.addCase(getAllJobThunk.rejected, (state) => {
            state.status = STATUS.ERROR
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
        builder.addCase(byIdJobThunk.rejected, (state) => {
            state.status = STATUS.ERROR
        })

        //add job
        builder.addCase(addJobThunk.pending, (state) => {
            state.status = STATUS.LOADING
        })
        builder.addCase(addJobThunk.fulfilled, (state) => {
            state.status = STATUS.LOADED;
        })
        builder.addCase(addJobThunk.rejected, (state) => {
            state.status = STATUS.ERROR
        })

        //delete job
        builder.addCase(deleteJobThunk.pending, (state) => {
            state.status = STATUS.LOADING
        })
        builder.addCase(deleteJobThunk.fulfilled, (state, {payload}) => {
            state.status = STATUS.LOADED;
            state.jobs = state.jobs.filter(job => job.id !== payload.id)
        })
        builder.addCase(deleteJobThunk.rejected, (state) => {
            state.status = STATUS.ERROR
        })

        //edit job
        builder.addCase(editJobThunk.pending, (state) => {
            state.status = STATUS.LOADING
        })
        builder.addCase(editJobThunk.fulfilled, (state) => {
            state.status = STATUS.LOADED;
        })
        builder.addCase(editJobThunk.rejected, (state) => {
            state.status = STATUS.ERROR
        })

        //static all job
        builder.addCase(staticAllJobThunk.pending, (state) => {
            state.status = STATUS.LOADING
            state.stats = null;
        })
        builder.addCase(staticAllJobThunk.fulfilled, (state, {payload}) => {
            state.status = STATUS.LOADED;
            state.stats = payload;
        })
        builder.addCase(staticAllJobThunk.rejected, (state) => {
            state.status = STATUS.ERROR
        })
    })
})


export default job.reducer