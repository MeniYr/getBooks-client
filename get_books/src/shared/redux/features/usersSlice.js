import axios from "axios"
import { API_URL, doApiGet, doApiMethod, TOKEN_NAME } from "../../services/apiService"
import { createSlice, createAsyncThunk, isRejected, isRejectedWithValue, createAction } from "@reduxjs/toolkit"
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
        }
        catch (err) {
            throw err?.response?.data[0]?.message
        }
    }
)

export const delUser = createAsyncThunk(
    'users/delUser', async (idDel) => {
        try {
            let data = await (await doApiMethod(`${USERS_URL}/del/${idDel}`, "DELETE")).data
            console.log(data)
            toast.success("המחיקה הושלמה")
            return data
        }
        catch (err) {
            throw err?.response?.data[0]?.message
        }
    }
)

export const getUser = createAsyncThunk(
    'users/getUser', async () => {
        try {
            let data = await (await doApiGet(`${USERS_URL}/userInfo`)).data
            // console.log(data)
            return data
        }
        catch (err) {
            throw err?.response?.data[0]?.message
        }
    }
)

export const getUserByID = createAsyncThunk(
    'users/getUserByID', async (userID) => {
        try {
            console.log(userID);
            let data = await (await doApiGet(`${USERS_URL}/userId/${userID}`)).data
            // console.log(data)
            return data
        }
        catch (err) {
            throw err?.response?.data[0]?.message
        }
    }
)

export const addUser = createAsyncThunk(
    'users/addUser', async (dataBody, { rejectWithValue }) => {
        try {
            const { data } = await doApiMethod(`${USERS_URL}/signUp`, "POST", dataBody)
            // console.log(data)
            return data
        }
        catch (err) {
            throw err?.response?.data[0]?.message
        }

    })

export const sendMassage = createAsyncThunk(
    'users/sendMassage', async (dataBody) => {
        try {
            let toUserID = dataBody.toUserId;
            delete dataBody.toUserId

            const { data } = await doApiMethod(`${USERS_URL}/addMsg/${toUserID}`, "POST", dataBody)
            console.log(data)
            return data
        }
        catch (err) {
            throw err?.response?.data[0]?.message
        }
    })

export const addNotify = createAsyncThunk(
    'users/addNotify', async (dataBody) => {
        try {
            let toUserID = dataBody.toUserId;
            delete dataBody.toUserId
            console.log(dataBody);
            console.log(toUserID);
            const { data } = await doApiMethod(`${USERS_URL}/addNotify/${toUserID}`, "POST", dataBody)
            console.log(data)
            if (data.modifiedCount === 1)
                return data
            else
                throw isRejectedWithValue("תקלה בנתונים")
        }
        catch (err) {
            throw err?.response?.data[0]?.message
        }
    })



const usersSlice = createSlice({
    name: 'users',
    initialState: {
        userByID: "",
        currentUser: null,
        users: [],
        status: 'idle',
        getUser_status: 'idle',
        getUsers_status: 'idle',
        signUp_status: 'idle',
        addNote_status: 'idle',
        msg_status: 'idle',
        userNotifyAlready: false,
        error: null
    },
    reducers: {

        logOutFromUsers: (state, action) => {

            state.userByID = "";
            state.currentUser = null;

        },

        isUserNotifyAlready: (state, action) => {

            if (action.payload && state.users.length > 0) {
                let isSameUser, isSameBook;
                state.users.forEach(item => {

                    item._id === action.payload.toUserId &&
                        item.notifications.find(notify_item => {
                            isSameBook = isSameUser = state.userNotifyAlready = false;
                            isSameBook = (notify_item.bookID === action.payload.bookID);
                            isSameUser = (notify_item.fromUserId === action.payload.fromUserId);
                            console.log(isSameBook && isSameUser);
                            if (isSameBook && isSameUser)
                                return state.userNotifyAlready = isSameBook && isSameUser;
                        });
                })
            }
            else{
                toast.error("ישנה תקלה זמנית, התחבר מחדש או רענן את הדף")
            }
        },

    },
    extraReducers(builder) {
        builder
            .addCase(getUsers.pending, (state, action) => {
                state.getUsers_status = 'loading'
                console.log(state.getUsers_status)
            })
            .addCase(getUsers.fulfilled, (state, action) => {
                if (action.payload) {
                    state.getUsers_status = 'succeeded';
                    state.users = action.payload
                    console.log(action.payload)
                }


                // console.log(state.users)

            })
            .addCase(getUsers.rejected, (state, action) => {
                state.getUsers_status = "failed"
                state.error = action.error
                console.log("here", state.error)

            })

            .addCase(addUser.pending, (state, action) => {
                state.signUp_status = 'loading'
                console.log(state.signUp_status)
            })
            .addCase(addUser.fulfilled, (state, action) => {

                if (action.payload) {
                    // state.users.push(action.payload)
                    state.signUp_status = "succeeded"
                    console.log(state.signUp_status)

                }
            })

            .addCase(addUser.rejected, (state, action) => {
                state.error = action.error.message
                state.signUp_status = "failed"
                console.log(state.error)

            })

            .addCase(getUser.pending, (state, action) => {
                state.getUser_status = 'loading'
                // console.log(state.status)
            })

            .addCase(getUser.fulfilled, (state, action) => {
                // console.log(action.payload)

                if (action.payload) {
                    // state.users.push(action.payload)
                    state.getUser_status = "succeeded"
                    state.currentUser = action.payload
                    console.log(state.status)
                    console.log(state.currentUser)

                }
            })

            .addCase(getUser.rejected, (state, action) => {
                state.error = action.error.message
                state.getUser_status = "failed"

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
                state.status = "failed"
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
                state.status = "failed"
                console.log(state.error)

            })

            .addCase(sendMassage.pending, (state, action) => {
                state.msg_status = 'loading'
                console.log(state.msg_status)
            })

            .addCase(sendMassage.fulfilled, (state, action) => {
                // console.log(action.payload)

                if (action.payload) {
                    // state.users.push(action.payload)
                    state.msg_status = "succeeded"
                    toast.info("ההודעה נשלחה")

                    console.log(state.msg_status)
                }
            })

            .addCase(sendMassage.rejected, (state, action) => {
                state.error = action.error.message
                console.log(state.error)
                state.msg_status = "failed"
            })

            .addCase(addNotify.pending, (state, action) => {
                state.addNote_status = 'loading'
                console.log(state.addNote_status)
            })

            .addCase(addNotify.fulfilled, (state, action) => {
                // console.log(action.payload)

                if (action.payload.modifiedCount === 1) {
                    // state.users.push(action.payload)
                    state.addNote_status = "succeeded"
                    console.log(state.addNote_status)

                }
            })

            .addCase(addNotify.rejected, (state, action) => {
                state.error = action.error.message
                state.addNote_status = "failed"
                console.log(state.error)
                console.log(state.addNote_status)
            })

    }
})


export const userMsg = (state) => state.users.currentUser?.msg
export const allUsers = (state) => state.users.users
export const getUsersSlice = (state) => state.users
export const getCurrentUser = (state) => state.users.currentUser
export const userStatus = (state) => state.users.status
// export const userById = (state) => state.users.userByID

export const { logOutFromUsers, isUserNotifyAlready } = usersSlice.actions
export default usersSlice.reducer;