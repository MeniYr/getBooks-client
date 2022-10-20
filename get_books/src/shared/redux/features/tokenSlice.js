import {
  createAsyncThunk,
  createSlice,
  isRejectedWithValue,
} from "@reduxjs/toolkit";
import { FLUSH, PURGE } from "redux-persist";
import { onLogin, persistor, register, reset } from "../../..";
import {
  API_URL,
  doApiGet,
  doApiMethod,
  TOKEN_NAME,
  USER_PROP,
} from "../../services/apiService";
import { logOutFromUsers } from "./usersSlice";

export const AuthWithToken = createAsyncThunk(
  "token/AuthWithToken",
  async () => {
    try {
      let data = await (await doApiGet(`${API_URL}/users/checkToken`)).data;
      console.log(data);
      if (!data.status === "ok")
        console.log("there is no token, maybe remove from storage");
      return data;
    } catch (err) {
      throw err?.response?.data[0]?.message;
    }
  }
);

export const login = createAsyncThunk("token/login", async (_dataBody) => {
  // try {
  try {
    let data = await (
      await doApiMethod(`${API_URL}/users/login`, "POST", _dataBody)
    ).data;
    console.log("data.expiredAt: ",data.expiredAt);
    if (data.token) {
      console.log(data.token);
      localStorage.setItem(TOKEN_NAME, data.token);
      return data;
    }
  } catch (err) {
    throw err?.response?.data[0]?.message;
  }
});

//TODO export const logOut = createAction("token/logOut")
// export const userId = createAction(("token/userId"))

const tokenSlice = createSlice({
  name: "token",
  initialState: {
    token: localStorage[TOKEN_NAME] || null,
    authStatus: "idle",
    logINStatus: "idle",
    error: null,
    userName: "",
    role: "",
    id: null,
  },
  reducers: {
    logOutFromToken: (state, action) => {
      console.log("here");
      localStorage.removeItem(TOKEN_NAME);
      state.token = null;
      state.userName = "";
      state.role = "";
      state.id = null;
      state.logINStatus = "idle";
    },
  },

  extraReducers(builder) {
    builder
    .addCase(PURGE, (state) => {
      console.log("here");
        state.token = null;
        state.userName = "";
        state.role = "";
        state.id = null;
        state.logINStatus = "idle";
    })
      .addCase(AuthWithToken.pending, (state, action) => {
        state.authStatus = "loading";
        // console.log(state.authStatus)
        // console.log(state.token)
      })

      .addCase(AuthWithToken.fulfilled, (state, action) => {
        if (action.payload) {
          console.log(action.payload);
          state.authStatus = "succeeded";
          state.role = action.payload.role;
        }
      })
      
      .addCase(AuthWithToken.rejected, (state, action) => {
        state.authStatus = "failed";
        state.error = action.error;
        console.log("AuthWithToken.rejected", state.error);
        window.location.assign(`${API_URL}/logOut`)
        // localStorage.removeItem(TOKEN_NAME)
        state.id = ""
        // state.token = null
        //  reset()
        // logOutFromToken();
      })

      .addCase(login.pending, (state, action) => {
        state.logINStatus = "loading";
        state.error = null;
        console.log(state.logINStatus);
        // console.log(state.token)
      })

      .addCase(login.fulfilled, (state, action) => {
        if (action.payload) {
          console.log(action.payload);
          state.logINStatus = "succeeded";
          state.error = null;
          state.token=localStorage[TOKEN_NAME];
          state.role = action.payload.user.role;
          state.id = action.payload.user.userID;
          state.userName = action.payload.user.name;
          console.log(action.payload.token);
          console.log(state.id);
          console.log(action.payload);
          console.log(state.logINStatus);
          // return state
        }
      })

      .addCase(login.rejected, (state, action) => {
        state.logINStatus = "failed";
        state.error = action.error;
        console.log("here_error_msg", state.error);
        console.log(state.token);
      });
  },
});

export const userID = (state) => state.token.id;
export const user_name = (state) => state.token.userName;
export const user_from_token = (state) => state.token;
export const { logOutFromToken } = tokenSlice.actions;
export default tokenSlice.reducer;
