import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {STATUS} from "../reduxType";

interface IUser {
    name: string;
    email: string;
}

interface IAuth  {
    user: string | null;
    status: STATUS
}

const initialState : IAuth = {
    user:  JSON.parse(`${localStorage.getItem("user")}`) || null,
    status: STATUS.NEVER
}

export const auth = createSlice({
    name:'auth',
    initialState,
    reducers: {
        addUserTest(state, action: PayloadAction<string>) {
            localStorage.setItem('user', JSON.stringify(action.payload))
            state.user = action.payload;
            state.status = STATUS.LOADED
        }
    },
    extraReducers: {}
})

export const {addUserTest} = auth.actions
export default auth.reducer