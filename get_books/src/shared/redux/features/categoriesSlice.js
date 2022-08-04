import { createAsyncThunk, createSlice, isRejectedWithValue } from "@reduxjs/toolkit"
import { API_URL, BOOKS, CAT } from "../../constants/globalinfo/URL`S"


import { doApiGet, doApiMethod, TOKEN_NAME, USER_PROP } from "../../services/apiService"



export const addCat = createAsyncThunk(
    'cat/addCat', async (_dataBody) => {
        try {
            let data = await (await doApiMethod(`${CAT}/add`, "POST", _dataBody)).data
            console.log(data)
            return data
        }
        catch (err) {
            throw err?.response?.data[0]?.message
        }
    }
)
export const getCat = createAsyncThunk(
    'cat/getCat', async (_dataBody) => {
        try {
            let data = await (await doApiGet(CAT)).data
            console.log(data)
            return data
        }
        catch (err) {
            throw err?.response?.data[0]?.message
        }
    }
)


const categoreisSlice = createSlice({
    name: 'cat',
    initialState: {
        categories: [],
        status: "idle",
        error: null
    },


    extraReducers(builder) {
        builder

            .addCase(addCat.pending, (state, action) => {
                state.status = 'loading'
                console.log(state.status)

            })

            .addCase(addCat.fulfilled, (state, action) => {

                if (action.payload) {
                    state.status = 'succeeded';
                    state.error = null;
                    state.categories.push(action.payload)

                    console.log(action.payload)

                    console.log(state.status)
                    // return state
                }

            })

            .addCase(addCat.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error
                console.log("here_error_msg", state.error)
            })


            .addCase(getCat.pending, (state, action) => {
                state.status = 'loading'
                console.log(state.status)

            })

            .addCase(getCat.fulfilled, (state, action) => {

                if (action.payload) {
                    state.status = 'succeeded';
                    state.error = null;
                    state.categories = action.payload

                    console.log(action.payload)

                    console.log(state.status)
                    // return state
                }

            })

            .addCase(getCat.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error
                console.log("here_error_msg", state.error)
            })


    }
})

export const categories = (state) => state.cat.categories

export default categoreisSlice.reducer;