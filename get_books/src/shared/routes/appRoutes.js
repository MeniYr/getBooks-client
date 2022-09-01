import React from "react";
import { BrowserRouter, Routes, Route, Outlet, Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import AllUsers from "../../componets/admin_comps/allUsers";
import EditUser from "../../componets/userCMS/userStorey/editUser";
import Login from "../auth/login";
import Signup from "../auth/signup";
import "react-toastify/dist/ReactToastify.css";
import Msg from "../../componets/userCMS/userStorey/userMsg";
import Home from "../../componets/home";
// import UserByID from '../../componets/userCMS/userStorey/userByID';
import Navbar from "../layout/navbar";
import SendMsg from "../../componets/userCMS/userStorey/sendMsg";
import BottomAppBar from "../../componets/userCMS/userStorey/inbox";
import AddBook from "../../componets/userCMS/bookStory/addBook";
import MyAccount from "../../componets/userCMS/userStorey/myAccount";
import Profile from "../../componets/userCMS/userStorey/profile";

import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { AuthWithToken, user_from_token } from "../redux/features/tokenSlice";
import { getUser, getUsersSlice } from "../redux/features/usersSlice";
import MyBooks from "../../componets/userCMS/bookStory/myBooks";
import Logout from "../auth/logOut";
import Search from "../../componets/search";
import { booksS, getBooks, myBooks } from "../redux/features/bookSlice";
import { doApiMethod } from "../services/apiService";
import { DELIVERY } from "../constants/globalinfo/URL`S";
import Delivery from "../components/delivery";
import Book from "../../componets/userCMS/bookStory/book";
import FullBook from "../../componets/userCMS/bookStory/fullBook";
import BooksOnDeliver from "../../componets/booksOnDeliver";
import Layout from "../layout/layout";
import BooksUserInterested from "../../componets/booksUserInterested";

export default function AppRoutes() {
  const dispatch = useDispatch();
  // const { books,userOnDeliveryBooks } = useSelector(booksS);
  // const { authStatus } = useSelector(user_from_token);
  const { currentUser } = useSelector(getUsersSlice);


  return (
    <BrowserRouter>
      {/* <HeaderClient /> */}

      {/* <Routes><Route path="/*" element={<Navbar />} /></Routes> */}
      {/* <BooksOnDeliver  /> */}

      {/* <Outlet /> */}
      <Routes>
        {/* <Navbar /> */}
        {/* user cms */}
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          {/* <Route path="/user/:idUser" element={<UserByID />} /> */}
          <Route path="/editUser/:id" element={<EditUser />} />
          <Route path="/msg" element={<Msg />} />
          <Route path="/sendMsg/:userId" element={<SendMsg />} />
          <Route path="/newBook" element={<AddBook />} />
          <Route path="/myAccount" element={<MyAccount />} />
          <Route path="/myProfile" element={<Profile />} />
          <Route path="/addBook" element={<AddBook />} />
          <Route path="/myBooks" element={<MyBooks />} />
          <Route path="/logOut" element={<Logout />} />
          <Route path="/search" element={<Search />} />
          <Route path="/delivery" element={<Delivery />} />
          <Route path="/fullBook/:bookId" element={<FullBook />} />
          <Route path="/booksOnDeliver" element={<BooksOnDeliver />} />
        </Route>

        {/*  <Route path="/logout" element={<Logout />} />
        <Route path="/userTickets" element={<UserTickets />} />
        <Route path="/addUserTicket" element={<AddUserTicket />} />
      <Route path="/favs" element={<FavList />} /> */}

        {/* admin */}
        <Route path="/allUsers" element={<AllUsers />} />
      </Routes>
      {/* FOOTER COMP */}
      <ToastContainer theme="colored" />
    </BrowserRouter>
  );
}
