import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
// import BooksOnDeliver from "../shared/layout/booksOnDeliver";
// import BooksUserInterested from "../shared/layout/booksUserInterested";
// import PrimarySearchAppBar from "../shared/layout/navbar";

import BooksOnDeliver from "./booksOnDeliver";
import BooksUserInterested from "./booksUserInterested";
import PrimarySearchAppBar from "./navbar";

export default function Layout() {
//   const dispatch = useDispatch();
//   const userName = useSelector(user_name);
//   const { bookJustLoaded } = useSelector(booksS);
//   const [isLoginMode, setIsLoginMode] = useState(true);
//   const [openModal, setOpenModal] = useState(false);

//   useEffect(() => {}, []);

  return (
    <div>
      <PrimarySearchAppBar />
      <div className="d-flex">
        <div className="col-2 border min-vh-100">
          <BooksUserInterested/>
        </div>
        <div className="col-8 border  min-vh-100">
          <Outlet />
        </div>
        <div className="col-2 border  min-vh-100">
          <BooksOnDeliver />
        </div>
      </div>
    </div>
  );
}