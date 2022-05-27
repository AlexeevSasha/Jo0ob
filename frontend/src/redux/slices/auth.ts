import {AnyAction, createSlice, PayloadAction, isAsyncThunkAction, isAllOf} from "@reduxjs/toolkit";
import {loginThunk, registerThunk, updateUserThunk} from '../thunk/auth'
import {STATUS} from "../reduxType";
import {addUserLocalStorage, removeUserLocalStorage} from "../../utils/localStorage";
import {IUser, IUserServer} from "../../api/auth/authDto";


const isARequestAction = isAsyncThunkAction(loginThunk, registerThunk, updateUserThunk)

interface IAuth {
    user: IUser | null;
    token: string
    status: STATUS;
}

const initialState: IAuth = {
    user: JSON.parse(`${localStorage.getItem("user")}`) || null,
    token: '',
    status: STATUS.NEVER,
}

export const auth = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.status = STATUS.NEVER;
            state.user = null;
            state.token = '';
            removeUserLocalStorage()
        }
    },
    extraReducers: (builder => {
        builder.addMatcher(isLoading, (state) => {
            state.status = STATUS.LOADING
        })

        builder.addMatcher(isSuccess, (state, {payload}: PayloadAction<IUserServer>) => {
            const {user, token} = payload;
            addUserLocalStorage({user, token})
            state.status = STATUS.LOADED;
            state.user = user;
            state.token = token;
        })
        builder.addMatcher(isError, (state) => {
            state.status = STATUS.ERROR
        })

    })
})


export const {logout} = auth.actions
export default auth.reducer


function isSuccess(action: AnyAction) {
    if (isARequestAction(action)) {
        return action.type.endsWith('fulfilled')
    }
    return false;
}

function isError(action: AnyAction) {
    return action.type.endsWith('rejected')
}

function isLoading(action: AnyAction) {
    return action.type.endsWith('pending')
}

