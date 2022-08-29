import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import "./index.module.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider, useSelector } from "react-redux";
import { myStore } from "./shared/redux/globalStore/store";
import {
  addUser,
  getCurrentUser,
  getUser,
  getUsers,
} from "./shared/redux/features/usersSlice";
import tokenSlice, {
  AuthWithToken,
  login,
} from "./shared/redux/features/tokenSlice";
import { getBooks } from "./shared/redux/features/bookSlice";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
const root = ReactDOM.createRoot(document.getElementById("root"));

// myStore.dispatch(AuthWithToken());
// myStore.dispatch(getUser());
// myStore.dispatch(getBooks());

// dispatch(getBooks())
// authStatus === "succeeded" && dispatch(getUser());
// currentUser?._id && dispatch(myBooks(currentUser?._id));

export const persistor = persistStore(myStore);
root.render(
  // <React.StrictMode>
    <Provider store={myStore}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
