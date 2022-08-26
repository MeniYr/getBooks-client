import {
  createAsyncThunk,
  createSlice,
  isRejectedWithValue,
} from "@reduxjs/toolkit";
import { API_URL, BOOKS, DELIVERY } from "../../constants/globalinfo/URL`S";

import { doApiGet, doApiMethod } from "../../services/apiService";

export const createDelivery = createAsyncThunk(
  "delivery/createDelivery",
  async (_dataBody) => {
    try {
      let data = await (
        await doApiMethod(`${DELIVERY}/create`, "POST", _dataBody)
      ).data;
      console.log(data);
      return data;
    } catch (err) {
      throw err?.response?.data[0]?.message;
    }
  }
);

export const delDelivery = createAsyncThunk(
  "delivery/delDelivery",
  async (_dataBody) => {
    try {
      let data = await (
        await doApiMethod(`${DELIVERY}/del/${_dataBody}`, "DELETE")
      ).data;
      console.log(data);
      return data;
    } catch (err) {
      throw err?.response?.data[0]?.message;
    }
  }
);

export const getDeliveries = createAsyncThunk(
  "delivery/getDeliveries",
  async () => {
    try {
      let data = await (await doApiGet(DELIVERY)).data;
      return data;
    } catch (err) {
      throw err?.response?.data[0]?.message;
    }
  }
);

export const addInterestedID = createAsyncThunk(
  "delivery/addInterestedID",
  async (bookID) => {
    try {
      let data = await (
        await doApiMethod(`${DELIVERY}/addInterestedID/${bookID}`, "PATCH")
      ).data;
      console.log("addInterestedID", data);
      return data;
    } catch (err) {
      throw err?.response?.data[0]?.message;
    }
  }
);

export const delInterestedID = createAsyncThunk(
  "delivery/delInterestedID",
  async (bookID) => {
    try {
      let data = await (
        await doApiMethod(`${DELIVERY}/delInterestedID/${bookID}`, "PATCH")
      ).data;
      return data;
    } catch (err) {
      throw err?.response?.data[0]?.message;
    }
  }
);

export const srchBooksOnDlvrs = createAsyncThunk(
  "delivery/srchBooksOnDlvrs",
  async (search_experetion) => {
    try {
      let data = await (
        await doApiMethod(`${DELIVERY}/srch`, "POST", search_experetion)
      ).data;
      console.log(data);
      return data;
    } catch (err) {
      throw err?.response?.data[0]?.message;
    }
  }
);
export const changeOwner = createAsyncThunk(
  "delivery/changeOwner",
  async (bookId) => {
    try {
      let data = await (
        await doApiMethod(`${DELIVERY}/changeOwner/${bookId}`, "PATCH")
      ).data;
      console.log(data);
      return data;
    } catch (err) {
      throw err?.response?.data[0]?.message;
    }
  }
);
export const changeUserToDeliver = createAsyncThunk(
  "delivery/changeUserToDeliver",
  async (bodydata) => {
    try {
      let data = await (
        await doApiMethod(`${DELIVERY}/changeUser`, "PUT",bodydata)
      ).data;
      console.log(data);
      return data;
    } catch (err) {
      throw err?.response?.data[0]?.message;
    }
  }
);

const deliverySlice = createSlice({
  name: "delivery",
  initialState: {
    deliveries: [],
    userDeliveries: [],
    srchRes: [],
    createDelivery_status: "idle",
    changeOwner_status: "idle",
    addInterestedID_status: "idle",
    getDeliveries_status: "idle",
    changeUserToDeliver_status: "idle",
    delDelivery_status: "idle",
    delInterestedID_status: "idle",
    error: null,
  },

  extraReducers(builder) {
    builder
      // add
      .addCase(createDelivery.pending, (state, action) => {
        state.createDelivery_status = "loading";
        console.log(state.createDelivery);
      })

      .addCase(createDelivery.fulfilled, (state, action) => {
        if (action.payload) {
          state.createDelivery_status = "succeeded";
          state.error = null;
          console.log(action.payload);
          console.log(state.createDelivery_status);
        }
      })

      .addCase(createDelivery.rejected, (state, action) => {
        state.createDelivery_status = "failed";
        state.error = action.error;
        console.log("here_error_msg", state.error);
      })

      // get
      .addCase(getDeliveries.pending, (state, action) => {
        state.getDeliveries_status = "loading";
        console.log(state.getDeliveries_status);
      })

      .addCase(getDeliveries.fulfilled, (state, action) => {
        if (action.payload) {
          state.getDeliveries_status = "succeeded";
          state.error = null;
          state.deliveries = [];
          state.deliveries = action.payload;

          // console.log(action.payload)
          console.log(state.getDeliveries_status);
        }
      })

      .addCase(getDeliveries.rejected, (state, action) => {
        state.getDeliveries_status = "failed";
        state.error = action.error;
        console.log("here_error_msg", state.error);
      })

      // del
      .addCase(delDelivery.pending, (state, action) => {
        state.delDelivery_status = "loading";
        console.log(state.delDelivery_status);
      })

      .addCase(delDelivery.fulfilled, (state, action) => {
        if (action.payload) {
          state.delDelivery_status = "succeeded";
          state.error = null;
          console.log(action.payload);
          console.log(state.delDelivery_status);
        }
      })

      .addCase(delDelivery.rejected, (state, action) => {
        state.delDelivery_status = "failed";
        state.error = action.error;
        console.log("here_error_msg", state.error);
      })

      // removeInterestedUser
      .addCase(delInterestedID.pending, (state, action) => {
        state.delInterestedID_status = "loading";
        console.log(state.delInterestedID_status);
      })

      .addCase(delInterestedID.fulfilled, (state, action) => {
        if (action.payload) {
          state.delInterestedID_status = "succeeded";
          state.error = null;
          console.log(action.payload);
          console.log(state.delInterestedID_status);
        }
      })

      .addCase(delInterestedID.rejected, (state, action) => {
        state.delInterestedID_status = "failed";
        state.error = action.error;
        console.log("here_error_msg", state.error);
      })
    //   changeOwner
      .addCase(changeOwner.pending, (state, action) => {
        state.changeOwner_status = "loading";
        console.log(state.changeOwner_status);
      })

      .addCase(changeOwner.fulfilled, (state, action) => {
        if (action.payload) {
          state.changeOwner_status = "succeeded";
          state.error = null;
          console.log(action.payload);
          console.log(state.changeOwner_status);
        }
      })

      .addCase(changeOwner.rejected, (state, action) => {
        state.changeOwner_status = "failed";
        state.error = action.error;
        console.log("here_error_msg", state.error);
      })
      .addCase(changeUserToDeliver.pending, (state, action) => {
        state.changeUserToDeliver_status = "loading";
        console.log(state.changeUserToDeliver_status);
      })

      .addCase(changeUserToDeliver.fulfilled, (state, action) => {
        if (action.payload) {
          state.changeUserToDeliver_status = "succeeded";
          state.error = null;
          console.log(action.payload);
          console.log(state.changeUserToDeliver_status);
        }
      })

      .addCase(changeUserToDeliver.rejected, (state, action) => {
        state.changeUserToDeliver_status = "failed";
        state.error = action.error;
        console.log("here_error_msg", state.error);
      })
  },
});

export const delivery = (state) => state.delivery;

export default deliverySlice.reducer;
