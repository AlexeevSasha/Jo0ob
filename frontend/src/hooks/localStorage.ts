import {IUserServer} from "../api/auth/authDto";


interface IUserLocalStorage extends IUserServer {
    location: string
}


export const addUserLocalStorage = ({user, token, location} : IUserLocalStorage) => {
    localStorage.setItem('user', JSON.stringify(user))
    localStorage.setItem('token', token)
    localStorage.setItem('location', location)
}

export const removeUserLocalStorage = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    localStorage.removeItem('location')
}