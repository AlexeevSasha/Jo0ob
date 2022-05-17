import {post} from "../baseRequest";
import {IUserServer, IRegister, ILogin} from "./authDto";


export  const authRegister = (data: IRegister) : Promise<IUserServer> => {
    return post('/api/auth/register', JSON.stringify(data))
}

export  const authLogin = (data: ILogin) : Promise<IUserServer> => {
    return post('/api/auth/login', JSON.stringify(data))
}