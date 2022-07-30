import React from 'react'
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import AllUsers from './admin_comps/allUsers';
import EditUser from './comps/userStore/editUser';
import Login from './comps/userStore/login';
import Signup from './comps/userStore/signup';
import 'react-toastify/dist/ReactToastify.css';
import Msg from './comps/userStore/msg';



export default function AppRoutes() {
  return (
    <BrowserRouter>
      {/* <HeaderClient /> */}
{/* <Outlet /> */}

      <Routes>
        {/* user cms */}

        <Route path="/signup" element={<Signup />} />
         <Route path="/login" element={<Login />} />
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
