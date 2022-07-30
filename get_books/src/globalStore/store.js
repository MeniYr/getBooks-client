import { combineReducers, configureStore } from "@reduxjs/toolkit";
import tokenSlice, { AuthWithToken, login } from "../features/tokenSlice";
import usersSlice from "../features/usersSlice";
import rootReducer from "./rootSlices";

// export const sharedSlices =  combineReducers({
//    users: usersSlice,
//     token: tokenSlice
// })
export const myStore = configureStore({
    
    reducer: rootReducer,
})