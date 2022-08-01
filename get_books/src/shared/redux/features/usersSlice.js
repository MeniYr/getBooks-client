import axios from "axios"
import { API_URL, doApiGet, doApiMethod } from "../../services/apiService"
import { createSlice, createAsyncThunk, isRejected, isRejectedWithValue } from "@reduxjs/toolkit"
import { toast } from "react-toastify"
import { AuthWithToken, userID } from "./tokenSlice"
import { USER_ByID_INFO, USER_INFO } from "../../constants/globalinfo/strings"

const USERS_URL = `${API_URL}/users`


export const getUsers = createAsyncThunk(
    'users/getUsers', async () => {
        try {
            let data = await (await doApiGet(USERS_URL)).data
            console.log(data)
            return data
        } catch (err) {
            console.log(err.response.data);
            return isRejectedWithValue(err)
        }
    }
)
export const delUser = createAsyncThunk(
    'users/delUser', async (idDel) => {
        try {
            let data = await (await doApiMethod(`${USERS_URL}/del/${idDel}`, "DELETE")).data
            console.log(data)
            toast.success("deleted successful")
            return data
        } catch (err) {
            console.log(err.response.data);
            return isRejectedWithValue(err)
        }
    }
)

export const getUser = createAsyncThunk(
    'users/getUser', async () => {
        try {
            let data = await (await doApiGet(`${USERS_URL}/userInfo`)).data
            // console.log(data)
            return data
        } catch (err) {
            console.log(err.response.data);
            return isRejectedWithValue(err)
        }
    }
)

export const getUserByID = createAsyncThunk(
    'users/getUserByID', async (userID) => {
console.log(userID);
        let data = await (await doApiGet(`${USERS_URL}/userId/${userID}`)).data
        // console.log(data)
        return data
    }
)

export const addUser = createAsyncThunk(
    'users/addUser', async (dataBody, { rejectWithValue }) => {
        try {
            const { data } = await doApiMethod(`${USERS_URL}/signUp`, "POST", dataBody)
            // console.log(data)
            return data

        } catch (err) {
            console.log("thunk", err)
            if (err.response.data.code === 11000) {
                toast.error(err.response.data.err_msg)
                return rejectWithValue(err.response.data)
            }
            toast.error(err.response.data.details[0].message)
            return rejectWithValue(err.response.data)


        }
    })




const usersSlice = createSlice({
    name: 'users',
    initialState: {
        userByID: "",
        currentUser: "",
        users: [],
        status: 'idle',
        error: null
    },
    reducers: {
        checkUser: {
            reducer(state, action) {
                console.log("here");
                state.users.users = [];
                state.users.users.push(action.payload)
            },
        }
    },
    extraReducers(builder) {
        builder
            .addCase(getUsers.pending, (state, action) => {
                state.status = 'loading'
                console.log(state.status)
            })
            .addCase(getUsers.fulfilled, (state, action) => {
                if (action.payload) {
                    state.status = 'succeeded';
                    state.users = []
                    state.users = action.payload
                    console.log(action.payload)
                }


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
                console.log(action.payload)

                console.log(action.meta)

                if (action.payload) {
                    // state.users.push(action.payload)
                    state.status = "succeeded"
                    console.log(state.status)

                }


            })
            .addCase(addUser.rejected, (state, action) => {
                state.error = action.error.message
                console.log(state.error)

            })

            .addCase(getUser.pending, (state, action) => {
                state.status = 'loading'
                // console.log(state.status)
            })

            .addCase(getUser.fulfilled, (state, action) => {
                // console.log(action.payload)

                if (action.payload) {
                    // state.users.push(action.payload)
                    state.status = "succeeded"
                    state.currentUser = action.payload
                    console.log(state.status)

                }
            })

            .addCase(getUser.rejected, (state, action) => {
                state.error = action.error.message
                console.log(state.error)

            })

            .addCase(getUserByID.pending, (state, action) => {
                state.status = 'loading'
                console.log(state.status)
            })

            .addCase(getUserByID.fulfilled, (state, action) => {
                // console.log(action.payload)

                if (action.payload) {
                    // state.users.push(action.payload)
                    state.status = "succeeded"
                    state.userByID = action.payload
                    console.log(state.status)

                }
            })

            .addCase(getUserByID.rejected, (state, action) => {
                state.error = action.error.message
                console.log(state.error)

            })

            .addCase(delUser.pending, (state, action) => {
                state.status = 'loading'
                console.log(state.status)
            })

            .addCase(delUser.fulfilled, (state, action) => {
                // console.log(action.payload)

                if (action.payload) {
                    // state.users.push(action.payload)
                    state.status = "succeeded"
                    state.userByID = action.payload
                    console.log(state.status)

                }
            })

            .addCase(delUser.rejected, (state, action) => {
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

export const userMsg = (state) => state.users.currentUser.msg
export const allUsers = (state) => state.users.users
export const getUsersSlice = (state) => state.users
export const userStatus = (state) => state.users.status
// export const userById = (state) => state.users.userByID

export default usersSlice.reducer;