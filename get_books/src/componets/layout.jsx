import { IconButton, Tooltip, Zoom } from "@mui/material";
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
import { booksS, getBooks } from "../shared/redux/features/bookSlice";
import { AuthWithToken, user_from_token } from "../shared/redux/features/tokenSlice";
import Footer from "../shared/layout/footer";

export default function Layout() {
  const nav = useNavigate();
  const { token } = useSelector(user_from_token);

  const {
    getBooks_status,
    userOnDeliveryBooks,
    getAllMyBooks_status,
    userBooks,
    swichHide_status,
  } = useSelector(booksS);
  const { id } = useSelector(user_from_token);
  const dispatch = useDispatch();

  useEffect(() => {
  }, []);

  return (
    <div>
      <PrimarySearchAppBar />
      <div className="d-md-flex">
        <div className="col-md-2 border min-vh-100  d-none d-md-block">
          <BooksUserInterested />
        </div>
        <div
          style={{
            position: "relative",
          }}
          className="col-md-8 border  min-vh-100"
        >
          <Outlet  />
          <Tooltip placement="top-end" TransitionComponent={Zoom} title="הוסף ספר">
            <IconButton
            onClick={() => nav("/addBook")}
            sx={{
              // border:"2px solid black",
              position: "fixed",
              left: "300px",
              bottom: "50px",
              zIndex: "99",
            }}
            aria-label="add"
            className={`${style_css.addBtn}`}
          >
            <MdAddCircleOutline size="60px" />
          </IconButton>
          </Tooltip>
          
        </div>
        <div className="col-md-2 border d-none d-md-block min-vh-100">
          <BooksOnDeliver />
        </div>
      </div >
      <div>
      <hr />
          <Footer />
      </div>
    
    </div>
  );
}
