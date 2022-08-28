import { configureStore } from "@reduxjs/toolkit";
import tokenSlice from "../features/tokenSlice";
import usersSlice, { getUsersSlice } from "../features/usersSlice";
import booksSlice from "../features/bookSlice";
import deliverySlice from "../features/deliverySlice";

import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const persistedReducer_tokenSlice = persistReducer(persistConfig, tokenSlice);
const persistedReducer_usersSlice = persistReducer(persistConfig, usersSlice);
const persistedReducer_booksSlice = persistReducer(persistConfig, booksSlice);

const persistedReducer_deliverySlice = persistReducer(
  persistConfig,
  deliverySlice
);


export const myStore = configureStore({
  reducer: {
    users: persistedReducer_usersSlice,
    token: persistedReducer_tokenSlice,
    books: persistedReducer_booksSlice,
    delivery: persistedReducer_deliverySlice,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: usersSlice,
      },
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
