import {IUserServer} from "../api/auth/authDto";




export const addUserLocalStorage = ({user, token} : IUserServer) => {
    localStorage.setItem('user', JSON.stringify(user))
    localStorage.setItem('token', token)
}

export const removeUserLocalStorage = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    localStorage.removeItem('location')
    window.location.replace("http://localhost:3000/");
}

export const getToken = () => localStorage.getItem("token")