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
import { booksS, getBooks } from "../shared/redux/features/bookSlice";
import { user_from_token } from "../shared/redux/features/tokenSlice";
import Footer from "../shared/layout/footer";

export default function Layout() {
  const nav = useNavigate();
  const { token } = useSelector(user_from_token);

  const { currentUser } = useSelector(getUsersSlice);
  const {
    getBooks_status,
    userOnDeliveryBooks,
    getAllMyBooks_status,
    userBooks,
    swichHide_status,
  } = useSelector(booksS);

  const dispatch = useDispatch();
  //   const [isLoginMode, setIsLoginMode] = useState(true);
  //   const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    // console.log("קורא ל-getBooks");
    // currentUser?._id && dispatch(getBooks())
  }, []);

  return (
    <div>
      <PrimarySearchAppBar />
      <div className="d-md-flex">
        <div className="col-md-2 border min-vh-100  d-none d-sm-block">
          <BooksUserInterested />
        </div>
        <div
          style={{
            position: "relative",
          }}
          className="col-md-8 border  min-vh-100"
        >
          <Outlet  />
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
        </div>
        <div className="col-md-2 border d-none d-sm-block min-vh-100">
          <BooksOnDeliver />
        </div>
      </div>
      <Footer />
    </div>
  );
}
