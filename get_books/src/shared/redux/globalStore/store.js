import { combineReducers, configureStore } from "@reduxjs/toolkit";
import tokenSlice, { AuthWithToken, login } from "../features/tokenSlice";
import usersSlice from "../features/usersSlice";
import booksSlice from "../features/bookSlice";
import rootReducer from "./rootSlices";
import categoriesSlice from "../features/categoriesSlice";

// export const sharedSlices =  combineReducers({
//    users: usersSlice,
//     token: tokenSlice
// })
export const myStore = configureStore({
    
    reducer: {
        users: usersSlice,
        token: tokenSlice,
        books: booksSlice,
        cat: categoriesSlice
    }
})