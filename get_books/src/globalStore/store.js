import { configureStore } from "@reduxjs/toolkit";
import usersSlice from "../features/usersSlice";


export const myStore = configureStore({
    reducer: {
        users:usersSlice
    }
})