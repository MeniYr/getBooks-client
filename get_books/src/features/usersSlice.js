import axios from "axios"
import { API_URL, doApiGet } from "../services/apiService"
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

const USERS_URL = `${API_URL}/users`
export const getUsers = createAsyncThunk(
    'users/getUsers', async () => {
      return await (await doApiGet(USERS_URL)).data
    }
)
// export const addUser = createAsyncThunk(
//     'users/getUsers', async () => {
//         try {
//         } catch (err) {

//         })



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
        .addCase(getUsers.pending, (state,action) => {
            state.status = 'loading'
            // console.log(state.status)
        })
        .addCase(getUsers.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.users = []
            state.users = action.payload
            // console.log(state.users)

        })
        .addCase(getUsers.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
            // console.log(state.error)

        })

    }
})


export default usersSlice.reducer;