import { configureStore } from "@reduxjs/toolkit";
//import type { RootState } from "./rootReducer";
//import { useDispatch } from 'react-redux'
import { rootReducer } from "./rootReducer";

export const store=configureStore({
    reducer: {
        rootReducer
    }
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch


