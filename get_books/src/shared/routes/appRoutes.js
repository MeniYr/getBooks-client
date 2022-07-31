import React from 'react'
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import AllUsers from '../../componets/admin_comps/allUsers';
import EditUser from '../../componets/userCMS/userStorey/editUser';
import Login from '../auth/login';
import Signup from '../auth/signup';
import 'react-toastify/dist/ReactToastify.css';
import Msg from '../../componets/userCMS/userStorey/userMsg';
import Home from '../../componets/home';
import UserByID from '../../componets/userCMS/userStorey/userByID';



export default function AppRoutes() {
  return (
    <BrowserRouter>
      {/* <HeaderClient /> */}
{/* <Outlet /> */}

      <Routes>
        {/* user cms */}
        <Route path="/" element={<Home/>} />

        <Route path="/signup" element={<Signup />} />
         <Route path="/login" element={<Login />} />
         <Route path="/user/:idUser" element={<UserByID />} />
         <Route path="/editUser/:id" element={<EditUser />} />
         <Route path="/msg" element={<Msg />} />

      {/*  <Route path="/logout" element={<Logout />} />
        <Route path="/userTickets" element={<UserTickets />} />
        <Route path="/addUserTicket" element={<AddUserTicket />} />
      <Route path="/favs" element={<FavList />} /> */}

        {/* admin */}
        <Route path="/allUsers" element={<AllUsers />} />

      </Routes>
      {/* FOOTER COMP */}
      <ToastContainer theme='colored' />

    </BrowserRouter>
  )
}
