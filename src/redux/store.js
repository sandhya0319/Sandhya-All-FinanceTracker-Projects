import { configureStore } from "@reduxjs/toolkit";
import transactionReducer from './slices/transactionsSilce'
import usersReducer from './slices/usersSlice'

export const store=configureStore({
    reducer:{
        transaction:transactionReducer,
        users:usersReducer,
    },
})