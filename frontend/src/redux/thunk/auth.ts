import {createAsyncThunk} from '@reduxjs/toolkit'
import {ILogin, IRegister, IUpdateUser, IUserServer} from "../../api/auth/authDto";
import {authLogin, authRegister, authUpdate} from "../../api/auth/authService";
import {successNotification} from "../../utils/notification";


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

export const updateUserThunk = createAsyncThunk<IUserServer,  IUpdateUser>(
    'auth/fetchUpdateUser',
    async (data) => {
        const response : IUserServer = await authUpdate(data);
        successNotification('user updated successfully')
        return response
    }
)