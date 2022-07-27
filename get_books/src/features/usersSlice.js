import axios from "axios"
import { API_URL, doApiGet, doApiMethod } from "../services/apiService"
import { createSlice, createAsyncThunk, isRejected, isRejectedWithValue } from "@reduxjs/toolkit"
import { toast } from "react-toastify"

const USERS_URL = `${API_URL}/users`
export const getUsers = createAsyncThunk(
    'users/getUsers', async () => {
        try {
            return await (await doApiGet(USERS_URL)).data
        } catch (err) {
            return err.message
        }
    }
)
export const addUser = createAsyncThunk(
    'users/addUser', async (data) => {
        try {
            let user = await (await doApiMethod(`${USERS_URL}/signUp`, "POST", data)).data
            console.log(user)
            return user
        } catch (err) {
            // console.log("thunk", err.response.data)
            if (err.response.data.code === 11000) {
                toast.error(err.response.data.err_msg)
                return isRejectedWithValue(err)
            }
            toast.error(err.response.data)
            return isRejectedWithValue(err)


        }
    })



const usersSlice = createSlice({
    name: 'users',
    initialState: {
        users: [],
        status: 'idle',
        error: null
    },
    // reducers: {
    //     addUser: {
    //         reducer(state, action) {
    //             state.users.users = [];
    //             state.users.users.push(action.payload)
    //         },
    //     }
    // },
    extraReducers(builder) {
        builder
            .addCase(getUsers.pending, (state, action) => {
                state.status = 'loading'
                console.log(state.status)
            })
            .addCase(getUsers.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.users = []
                state.users = action.payload
                // console.log(state.users)

            })
            .addCase(getUsers.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error
                console.log("here", state.error)

            })
            .addCase(addUser.pending, (state, action) => {
                state.status = 'loading'
                console.log(state.status)
            })
            .addCase(addUser.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.users.push(action.payload)
            })
            .addCase(addUser.rejected, (state, action) => {
                state.error = action.error.message
                console.log(state.error)
                
            })
            // .addMatcher(addUser.rejected, (state,action) =>{
            //     state.status = 'failed'
            //     console.log(state.status)
            //     console.log("rej")
            // }

    }
})


export default usersSlice.reducer;