import { createAsyncThunk, createSlice, isRejectedWithValue } from "@reduxjs/toolkit"
import { API_URL, BOOKS, DELIVERY } from "../../constants/globalinfo/URL`S"


import { doApiGet, doApiMethod } from "../../services/apiService"



export const createDelivery = createAsyncThunk(
    'delivery/createDelivery', async (_dataBody) => {
        try {
            let data = await (await doApiMethod(`${DELIVERY}/create`, "POST", _dataBody)).data
            console.log(data)
            return data
        }
        catch (err) {
            throw err?.response?.data[0]?.message
        }
    }
)

export const delDelivery = createAsyncThunk(
    'delivery/delDelivery', async (_dataBody) => {
        try {
            let data = await (await doApiMethod(`${DELIVERY}/del/${_dataBody}`, "DELETE")).data
            console.log(data)
            return data
        }
        catch (err) {
            throw err?.response?.data[0]?.message
        }
    }
)

export const getDeliveries = createAsyncThunk(
    'delivery/getDeliveries', async () => {
        try {
            let data = await (await doApiGet(DELIVERY)).data
            return data
        }
        catch (err) {
            throw err?.response?.data[0]?.message
        }
    }
)

export const addInterestedID = createAsyncThunk(
    'delivery/addInterestedID', async (bookID) => {
        try {
            let data = await (await doApiMethod(`${DELIVERY}/addInterestedID/${bookID}`, "PATCH")).data
            console.log(data)
            return data
        }
        catch (err) {
            throw err?.response?.data[0]?.message
        }
    }
)

export const delInterestedID = createAsyncThunk(
    'delivery/delInterestedID', async (bookID) => {
        try {
            let data = await (await doApiMethod(`${DELIVERY}/delInterestedID/${bookID}`, "PATCH")).data
            return data
        }
        catch (err) {
            throw err?.response?.data[0]?.message
        }
    }
)

export const srchBooksOnDlvrs = createAsyncThunk(
    'delivery/srchBooksOnDlvrs', async (search_experetion) => {
        try {
            let data = await (await doApiMethod(`${BOOKS}/srch`, "POST", search_experetion)).data
            console.log(data)
            return data
        }
        catch (err) {
            throw err?.response?.data[0]?.message
        }
    }
)


const deliverySlice = createSlice({
    name: 'delivery',
    initialState: {
        deliveries: [],
        userDeliveries: [],
        srchRes: [],
        createDelivery_status: "idle",
        addInterestedID_status: "idle",
        getDeliveries_status: "idle",
        delDelivery_status: "idle",
        delInterestedID_status: "idle",
        error: null
    },


    extraReducers(builder) {
        builder
            // add
            .addCase(createDelivery.pending, (state, action) => {
                state.createDelivery_status = 'loading'
                console.log(state.createDelivery)
            })

            .addCase(createDelivery.fulfilled, (state, action) => {

                if (action.payload) {
                    state.createDelivery_status = 'succeeded';
                    state.error = null;
                    console.log(action.payload)
                    console.log(state.createDelivery_status)
                }
            })

            .addCase(createDelivery.rejected, (state, action) => {
                state.createDelivery_status = 'failed'
                state.error = action.error
                console.log("here_error_msg", state.error)
            })


            // get
            .addCase(getDeliveries.pending, (state, action) => {
                state.getDeliveries_status = 'loading'
                console.log(state.getDeliveries_status)

            })

            .addCase(getDeliveries.fulfilled, (state, action) => {

                if (action.payload) {
                    state.getDeliveries_status = 'succeeded';
                    state.error = null;
                    state.deliveries = action.payload

                    // console.log(action.payload)
                    console.log(state.getDeliveries_status)

                }
            })

            .addCase(getDeliveries.rejected, (state, action) => {
                state.getDeliveries_status = 'failed'
                state.error = action.error
                console.log("here_error_msg", state.error)
            })


            // del
            .addCase(delDelivery.pending, (state, action) => {
                state.delDelivery_status = 'loading'
                console.log(state.delDelivery_status)

            })

            .addCase(delDelivery.fulfilled, (state, action) => {

                if (action.payload) {
                    state.delDelivery_status = 'succeeded';
                    state.error = null;
                    console.log(action.payload)
                    console.log(state.delDelivery_status)

                }


            })

            .addCase(delDelivery.rejected, (state, action) => {
                state.delDelivery_status = 'failed'
                state.error = action.error
                console.log("here_error_msg", state.error)
            })

            // removeInterestedUser
            .addCase(delInterestedID.pending, (state, action) => {
                state.delInterestedID_status = 'loading'
                console.log(state.delInterestedID_status)

            })

            .addCase(delInterestedID.fulfilled, (state, action) => {

                if (action.payload) {
                    state.delInterestedID_status = 'succeeded';
                    state.error = null;
                    console.log(action.payload)
                    console.log(state.delInterestedID_status)

                }


            })

            .addCase(delInterestedID.rejected, (state, action) => {
                state.delInterestedID_status = 'failed'
                state.error = action.error
                console.log("here_error_msg", state.error)
            })


    }
})


export const delivery = (state) => state.delivery

export default deliverySlice.reducer;