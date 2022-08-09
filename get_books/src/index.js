import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './index.module.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { myStore } from './shared/redux/globalStore/store';
import { addUser, getUser, getUsers } from './shared/redux/features/usersSlice';
import tokenSlice, { AuthWithToken, login } from './shared/redux/features/tokenSlice';
import { getBooks } from './shared/redux/features/bookSlice';

const root = ReactDOM.createRoot(document.getElementById('root'));
myStore.dispatch(getBooks())
myStore.dispatch(getUser())


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
