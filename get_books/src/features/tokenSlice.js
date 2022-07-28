import { createAsyncThunk, createSlice, isRejectedWithValue } from "@reduxjs/toolkit"
import { useNavigate } from "react-router-dom"
import { API_URL, doApiGet, doApiMethod, TOKEN_NAME } from "../services/apiService"


export const AuthWithToken = createAsyncThunk(
    'token/getToken', async () => {
        try {
            let data = await (await doApiGet(`${API_URL}/users/checkToken`)).data
            console.log(data)
            return data
        } catch (err) {
            console.log(err.response.data)
            return isRejectedWithValue(err.response.message)
        }
    }
)
export const login = createAsyncThunk(
    'token/login', async (_dataBody) => {
        try {
            let data = await (await doApiMethod(`${API_URL}/users/login`, "POST", _dataBody)).data
            console.log(data)
            if(data.token)
                localStorage[TOKEN_NAME] = data.token
            return data
        } catch (err) {

            return isRejectedWithValue(err.response.message)
        }
    }
)


const tokenSlice = createSlice({
    name: 'token',
    initialState: {
        token: localStorage[TOKEN_NAME] || null,
        authStatus: 'idle',
        logINStatus: 'idle',
        error: null,
        userName: "",
        role: "",
        id: ""
    },
    // reducers: {
    //     token: {
    //         reducer(state, action) {
    //             // state.token = [];
    //             state.token.push(action.payload)
    //             console.log(state.token)
    //             console.log(AuthWithToken)
    //         },
    //     }
    // },

    extraReducers(builder) {
        builder
            .addCase(AuthWithToken.pending, (state, action) => {
                state.authStatus = 'loading'
                console.log(state.authStatus)
                console.log(state.token)
            })
            .addCase(AuthWithToken.fulfilled, (state, action) => {
                if (action.payload) {
                    state.authStatus = 'succeeded';
                    // state.token = []
                    console.log(action.payload)

                
                    console.log(state.token)
                }

            })
            .addCase(AuthWithToken.rejected, (state, action) => {
                state.authStatus = 'failed'
                state.error = action.error
                console.log("AuthWithToken.rejected", state.error)

            })

            .addCase(login.pending, (state, action) => {
                state.logINStatus = 'loading'
                console.log(state.logINStatus)
                console.log(state.token)
            })
            .addCase(login.fulfilled, (state, action) => {
                if (action.payload) {
                    state.logINStatus = 'succeeded';
                 
                    state.userName = action.payload.user.name
                    state.token = action.payload.token
                    localStorage[TOKEN_NAME] = state.token
                    state.role = action.payload.user.role
                    state.id = action.payload.user.userID
                    console.log(state.token)
                    // console.log(state.userName)
                }

            })
            .addCase(login.rejected, (state, action) => {
                state.logINStatus = 'failed'
                state.error = action.error
                console.log("here", state.error)
                console.log(state.token)

            })


    }
})


export default tokenSlice.reducer;