import { combineReducers } from '@reduxjs/toolkit'
import { usersSlice } from './slices/usersSlice'
import { transactionsSlice } from './slices/transactionsSlice'

export const rootReducer = combineReducers({
    transactions: transactionsSlice.reducer,
    users: usersSlice.reducer,
})