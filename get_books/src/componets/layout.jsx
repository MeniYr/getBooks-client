import { IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import { MdAddCircleOutline } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import style_css from "./layoutCss.module.css";
// import BooksOnDeliver from "../shared/layout/booksOnDeliver";
// import BooksUserInterested from "../shared/layout/booksUserInterested";
// import PrimarySearchAppBar from "../shared/layout/navbar";

import BooksOnDeliver from "./booksOnDeliver";
import BooksUserInterested from "../shared/layout/booksUserInterested";
import PrimarySearchAppBar from "../shared/layout/navbar";
import { getUsersSlice } from "../shared/redux/features/usersSlice";
import { booksS, getBooks, myBooks } from "../shared/redux/features/bookSlice";
import { user_from_token } from "../shared/redux/features/tokenSlice";

export default function Layout() {
  const nav = useNavigate();
  const { token } = useSelector(user_from_token);

    const { currentUser } = useSelector(getUsersSlice);
    const { getBooks_status,userOnDeliveryBooks } = useSelector(booksS);

    const dispatch = useDispatch();
  //   const [isLoginMode, setIsLoginMode] = useState(true);
  //   const [openModal, setOpenModal] = useState(false);
  
  useEffect(() => {

currentUser?._id && dispatch(getBooks())

  }, [currentUser]);

  return (
    <div
      style={{
        position: "relative",
      }}
    >
      <PrimarySearchAppBar />
      <div className="d-flex">
        <div className="col-2 border min-vh-100">
          <BooksUserInterested />
        </div>
        <div className="col-8 border  min-vh-100">
          <Outlet context={booksS}/>
        </div>
        <div className="col-2 border  min-vh-100">
          <BooksOnDeliver />
        </div>
        <IconButton
          onClick={() => nav("/addBook")}
          sx={{
            // border:"2px solid black",
            position: "fixed",
            left: "250px",
            bottom: "50px",
            zIndex: "99",
          }}
          aria-label="add"
          className={`${style_css.addBtn}`}
        >
          <MdAddCircleOutline size="60px" />
        </IconButton>
      </div>
    </div>
  );
}
