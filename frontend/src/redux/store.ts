import { configureStore} from '@reduxjs/toolkit'
import authSlice from "./slices/auth";
import jobsSlice from "./slices/job";

export const store = configureStore({
    reducer: {
      auth: authSlice,
      jobs: jobsSlice
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;