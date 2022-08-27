import { configureStore } from "@reduxjs/toolkit";
import tokenSlice from "../features/tokenSlice";
import usersSlice from "../features/usersSlice";
import booksSlice from "../features/bookSlice";
import categoriesSlice from "../features/categoriesSlice";
import deliverySlice from "../features/deliverySlice";
import modelSlice from "../features/modelSlice";
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
  blacklist: [usersSlice],
};

const persistedReducer_tokenSlice = persistReducer(persistConfig, tokenSlice);
const persistedReducer_usersSlice = persistReducer(persistConfig, usersSlice);
const persistedReducer_booksSlice = persistReducer(persistConfig, booksSlice);
const persistedReducer_categoriesSlice = persistReducer(
  persistConfig,
  categoriesSlice
);
const persistedReducer_deliverySlice = persistReducer(
  persistConfig,
  deliverySlice
);
const persistedReducer_modelSlice = persistReducer(persistConfig, modelSlice);

export const myStore = configureStore({
  reducer: {
    users: persistedReducer_usersSlice,
    token: persistedReducer_tokenSlice,
    books: persistedReducer_booksSlice,
    cat: persistedReducer_categoriesSlice,
    delivery: persistedReducer_deliverySlice,
    model: persistedReducer_modelSlice,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
        thunk:{
            extraArgument:usersSlice,
        },
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
