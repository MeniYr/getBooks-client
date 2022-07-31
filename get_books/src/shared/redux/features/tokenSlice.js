import { createAction, createAsyncThunk, createSlice, isRejectedWithValue } from "@reduxjs/toolkit"
import { useEffect, useState } from "react"

import { API_URL, doApiGet, doApiMethod, TOKEN_NAME, USER_PROP } from "../../services/apiService"


export const AuthWithToken = createAsyncThunk(
    'token/getToken', async () => {
        try {
            let data = await (await doApiGet(`${API_URL}/users/checkToken`)).data
            console.log(data)
            if (!data.status === "ok")
                console.log("there is no token, maybe remove from storage")
            return data
        } catch (err) {
            localStorage.removeItem(TOKEN_NAME)
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
            if (data.token)
                localStorage[TOKEN_NAME] = data.token
            return data
        } catch (err) {

            return isRejectedWithValue(err.response.message)
        }
    }
)

//TODO export const logOut = createAction("token/logOut")
// export const userId = createAction(("token/userId"))

const tokenSlice = createSlice({
    name: 'token',
    initialState: {
        token: localStorage.getItem(TOKEN_NAME) || null,
        authStatus: 'idle',
        logINStatus: 'idle',
        error: null,
        userName: JSON.parse(localStorage[USER_PROP]).userName,
        role: JSON.parse(localStorage[USER_PROP]).role,
        id: JSON.parse(localStorage[USER_PROP]).id
    },
    reducers: {
        user_ID: (state, action) => {
            console.log(action.payload)
            state.id = action.payload
        }
    },
    extraReducers(builder) {
        builder
            .addCase(AuthWithToken.pending, (state, action) => {
                state.authStatus = 'loading'
                // console.log(state.authStatus)
                // console.log(state.token)
            })

            .addCase(AuthWithToken.fulfilled, (state, action) => {
                if (action.payload) {
                    state.authStatus = 'succeeded';
                    state.role = action.payload.role;
                    // console.log(state.token)
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

                    localStorage.setItem(TOKEN_NAME,action.payload.token)
                    localStorage[USER_PROP] = JSON.stringify({
                        role: action.payload.user.role,
                        id: action.payload.user.userID,
                        userName: action.payload.user.name
                    })

                    console.log(action.payload.token)
                    console.log(state.id)
                    console.log(action.payload.user.userID)
                }

            })
            .addCase(login.rejected, (state, action) => {
                state.logINStatus = 'failed'
                state.error = action.error
                console.log("here", state.error)
                console.log(state.token)

            })
        // .addCase(logOut.pending, (state, action) => {
        //     state.logINStatus = 'loading'

        // })
        // .addCase(logOut.fulfilled, (state, action) => {
        //     if (action.payload) {
        //         state.logINStatus = 'succeeded';
        //         // localStorage.removeItem(TOKEN_NAME)
        //         state.role = ""
        //         state.id = ""
        //         state.token = null
        //         console.log(state.token)
        //         // console.log(state.userName)
        //     }

        // })
        // .addCase(logOut.rejected, (state, action) => {
        //     state.logINStatus = 'failed'
        //     state.error = action.error
        // })


    }
})
export const userID = (state) => state.token.id
// export const { user_ID } = tokenSlice.actions
export default tokenSlice.reducer;