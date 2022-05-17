import {createAsyncThunk} from '@reduxjs/toolkit'
import {ILogin, IRegister, IUserServer} from "../../api/auth/authDto";
import {authLogin, authRegister} from "../../api/auth/authService";


export const registerThunk = createAsyncThunk<IUserServer,  {data: IRegister, cb: () => void}>(
    'auth/fetchRegister',
    async ({data, cb}) => {
        const response: IUserServer = await authRegister(data)
        cb()
        return response
    }
)

export const loginThunk = createAsyncThunk<IUserServer,  {data: ILogin, cb: () => void}>(
    'auth/fetchLogin',
    async ({data, cb}) => {
        const response : IUserServer = await authLogin(data)
        cb()
        return response
    }
)