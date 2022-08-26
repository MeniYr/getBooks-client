import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './index.module.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider, useSelector } from 'react-redux';
import { myStore } from './shared/redux/globalStore/store';
import { addUser, getCurrentUser, getUser, getUsers } from './shared/redux/features/usersSlice';
import tokenSlice, { AuthWithToken, login } from './shared/redux/features/tokenSlice';
import { getBooks, myBooks } from './shared/redux/features/bookSlice';

const root = ReactDOM.createRoot(document.getElementById('root'));
myStore.dispatch(AuthWithToken());
myStore.dispatch(getUser())
myStore.dispatch(getBooks())

// dispatch(getBooks())
// authStatus === "succeeded" && dispatch(getUser());
// currentUser?._id && dispatch(myBooks(currentUser?._id));

root.render(
  // <React.StrictMode>
    <Provider store={myStore} >
      <App />
    </Provider>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
