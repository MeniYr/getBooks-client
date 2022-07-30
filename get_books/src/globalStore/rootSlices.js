import { combineReducers } from "redux";
import tokenSlice, { login } from "../features/tokenSlice";
import usersSlice, { getUsers } from "../features/usersSlice";



const rootReducer = combineReducers({
    usersSlice: usersSlice,
    token: tokenSlice
})

export default rootReducer
