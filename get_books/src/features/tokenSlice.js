import { createAsyncThunk, createSlice, isRejectedWithValue } from "@reduxjs/toolkit"
import { useNavigate } from "react-router-dom"
import { API_URL, doApiGet, TOKEN_NAME } from "../services/apiService"

export const AuthWithToken = createAsyncThunk(
    'token/getToken', async () => {
        try {
            return await (await doApiGet(`${API_URL}/users/checkToken`)).data
        } catch (err) {
          
            return isRejectedWithValue(err.response.message)
        }
    }
)


const tokenSlice = createSlice({
    name: 'token',
    initialState: {
        token: [],
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
            .addCase(AuthWithToken.pending, (state, action) => {
                state.status = 'loading'
                console.log(state.status)
            })
            .addCase(AuthWithToken.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.token = []
                state.token = action.payload
                console.log(state.token)

            })
            .addCase(AuthWithToken.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error
                console.log("here", state.error)

            })


    }
})


export default tokenSlice.reducer;