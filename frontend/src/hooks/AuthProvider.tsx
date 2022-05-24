import {FC, useEffect} from "react";
import {Outlet} from "react-router-dom";
import {useNavigate, Navigate} from "react-router-dom";
import {useAppSelector} from "../redux/reduxType";



export const AuthProvider: FC= () => {
    const { user } = useAppSelector(state => state.auth)

    if (!user) {
        return <Navigate to="/" replace/>;
    }

    return <Outlet/>
}

export const UserProvider: FC= () => {
    const { user } = useAppSelector(state => state.auth)

    if (user) {
        return <Navigate to="/stats" replace/>;
    }
    return <Outlet/>
}