import { combineReducers, configureStore } from "@reduxjs/toolkit";
import tokenSlice, { AuthWithToken, login } from "../features/tokenSlice";
import usersSlice from "../features/usersSlice";
import booksSlice from "../features/bookSlice";
import categoriesSlice from "../features/categoriesSlice";
import deliverySlice from "../features/deliverySlice";
import modelSlice from "../features/modelSlice";


export const myStore = configureStore({
    
    reducer: {
        users: usersSlice,
        token: tokenSlice,
        books: booksSlice,
        cat: categoriesSlice,
        delivery: deliverySlice,
        model: modelSlice
    }
})