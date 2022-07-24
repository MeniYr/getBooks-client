import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Signup from './userCms/signup';



export default function AppRoutes() {
  return (
    <BrowserRouter>
      {/* <HeaderClient /> */}

      <Routes>

        {/* user cms */}
        <Route path="/signup" element={<Signup />} />
        {/* <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/userTickets" element={<UserTickets />} />
        <Route path="/addUserTicket" element={<AddUserTicket />} />
        <Route path="/favs" element={<FavList />} /> */}

        {/* admin */}

      </Routes>
      {/* FOOTER COMP */}
      <ToastContainer theme='colored' />

    </BrowserRouter>
  )
}
