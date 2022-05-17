import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {loginThunk, registerThunk} from '../thunk/auth'
import {STATUS} from "../reduxType";
import {addUserLocalStorage} from "../../hooks/localStorage";
import {IUser} from "../../api/auth/authDto";


interface IAuth  {
    user: IUser | null;
    token: string
    status: STATUS;
}

const initialState : IAuth = {
    user:  JSON.parse(`${localStorage.getItem("user")}`) || null,
    token: '',
    status: STATUS.NEVER,
}

export const auth = createSlice({
    name:'auth',
    initialState,
    reducers: {

    },
    extraReducers: (builder => {
        //register
        builder.addCase(registerThunk.pending, (state) => {
            state.status = STATUS.LOADING
            state.user = null;
        })
        builder.addCase(registerThunk.fulfilled, (state, {payload}) => {
            const {user, token, location} =  payload;
            state.status = STATUS.LOADED;
            state.user = user;
            state.token = token;
            addUserLocalStorage({user, token, location})
        })
        builder.addCase(registerThunk.rejected, (state) => {
            state.status = STATUS.ERROR
        })

        //login
        builder.addCase(loginThunk.pending, (state) => {
            state.status = STATUS.LOADING
            state.user = null;
        })
        builder.addCase(loginThunk.fulfilled, (state, {payload}) => {
            const {user, token, location} =  payload;
            state.status = STATUS.LOADED;
            state.user = user;
            state.token = token;
            addUserLocalStorage({user, token, location})
        })
        builder.addCase(loginThunk.rejected, (state) => {
            state.status = STATUS.ERROR
        })
    })
})

export const {} = auth.actions
export default auth.reducer