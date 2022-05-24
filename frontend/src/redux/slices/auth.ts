import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {loginThunk, registerThunk, updateUserThunk} from '../thunk/auth'
import {STATUS} from "../reduxType";
import {addUserLocalStorage, removeUserLocalStorage} from "../../utils/localStorage";
import {IUser, IUserServer} from "../../api/auth/authDto";


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
        logout: (state) => {
            state.status = STATUS.NEVER;
            state.user = null;
            state.token = '';
            removeUserLocalStorage()
        },
        addUser: (state, {payload}: PayloadAction<IUserServer>) => {
            const {user, token} =  payload;
            state.status = STATUS.LOADED;
            state.user = user;
            state.token = token;
            addUserLocalStorage({user, token})
        }
    },
    extraReducers: (builder => {
        //register
        builder.addCase(registerThunk.pending, (state) => {
            state.status = STATUS.LOADING
            state.user = null;
        })
        builder.addCase(registerThunk.fulfilled, (state, {payload}) => {
            const {user, token} =  payload;
            state.status = STATUS.LOADED;
            state.user = user;
            state.token = token;
            addUserLocalStorage({user, token})
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
            const {user, token} =  payload;
            state.status = STATUS.LOADED;
            state.user = user;
            state.token = token;
            addUserLocalStorage({user, token})
        })
        builder.addCase(loginThunk.rejected, (state) => {
            state.status = STATUS.ERROR
        })

        //update
        builder.addCase(updateUserThunk.pending, (state) => {
            state.status = STATUS.LOADING
        })
        builder.addCase(updateUserThunk.fulfilled, (state, {payload}) => {
            const {user, token} =  payload;
            state.status = STATUS.LOADED;
            state.user = user;
            state.token = token;
            addUserLocalStorage({user, token})
        })
        builder.addCase(updateUserThunk.rejected, (state) => {
            state.status = STATUS.ERROR
        })
    })
})

export const {logout} = auth.actions
export default auth.reducer