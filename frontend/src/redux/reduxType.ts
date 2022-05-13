import {useSelector,TypedUseSelectorHook, useDispatch} from 'react-redux'
import {AppDispatch, RootState} from "./store";


export enum STATUS {
    LOADED = 'LOADED',
    LOADING = 'LOADING',
    ERROR = 'ERROR',
    NEVER = 'NEVER',
    EMPTY = 'EMPTY'
}

export const useAppDispatch =  () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;


