import {patch, post} from "../baseRequest";
import {IUserServer, IRegister, ILogin, IUpdateUser} from "./authDto";
import {getToken} from "../../utils/localStorage";

export  const authRegister = (data: IRegister) : Promise<IUserServer> => {
    return post('/api/auth/register', JSON.stringify(data))
}

export  const authLogin = (data: ILogin) : Promise<IUserServer> => {
    return post('/api/auth/login', JSON.stringify(data))
}

export  const authUpdate = (data: IUpdateUser) : Promise<IUserServer> => {
    const token = getToken() as string
    return patch('/api/auth/updateUser', JSON.stringify(data), token)
}