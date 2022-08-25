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
import BooksUserInterested from "./booksUserInterested";
import PrimarySearchAppBar from "./navbar";

export default function Layout() {
  const nav = useNavigate();

  //   const dispatch = useDispatch();
  //   const userName = useSelector(user_name);
  //   const { bookJustLoaded } = useSelector(booksS);
  //   const [isLoginMode, setIsLoginMode] = useState(true);
  //   const [openModal, setOpenModal] = useState(false);

  //   useEffect(() => {}, []);

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
          <Outlet />
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
