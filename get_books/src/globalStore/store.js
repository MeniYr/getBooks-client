import { configureStore } from "@reduxjs/toolkit";
import tokenSlice from "../features/tokenSlice";
import usersSlice from "../features/usersSlice";


export const myStore = configureStore({
    reducer: {
        users:usersSlice,
        token:tokenSlice
    }
})