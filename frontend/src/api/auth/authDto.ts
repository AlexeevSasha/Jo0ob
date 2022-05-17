
export interface IRegister {
    name: string;
    email: string;
    password: string;
    lastName?: string
}
export interface ILogin{
    email: string;
    password: string;
}

export interface IUser {
    email: string;
    name: string;
    lastName: string;
    location: string
}

export interface IUserServer {
    user: IUser;
    token: string;
    location: string
}

