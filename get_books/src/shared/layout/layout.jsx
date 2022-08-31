import { IconButton, Tooltip, Zoom } from "@mui/material";
import React, { useEffect, useState } from "react";
import { MdAddCircleOutline } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import style_css from "./layoutCss.module.css";
// import BooksOnDeliver from "../shared/layout/booksOnDeliver";
// import BooksUserInterested from "../shared/layout/booksUserInterested";
// import PrimarySearchAppBar from "../shared/layout/navbar";

import BooksOnDeliver from "../../componets/booksOnDeliver";
import BooksUserInterested from "../../componets/booksUserInterested";
import PrimarySearchAppBar from "./navbar";
import { getUser, getUsersSlice } from "../redux/features/usersSlice";
import { booksS, getBooks } from "../redux/features/bookSlice";
import { AuthWithToken, user_from_token } from "../redux/features/tokenSlice";
import Footer from "./footer";
import { re, register, reset } from "../..";
import { toast } from "react-toastify";

export default function Layout() {
  const nav = useNavigate();
  const { token, logINStatus, id } = useSelector(user_from_token);
  const { currentUser } = useSelector(getUsersSlice);
  const [width, setWidth] = useState(window.innerWidth)

  const {
    getBooks_status,
    userOnDeliveryBooks,
    getAllMyBooks_status,
    userBooks,
    swichHide_status,
    changeUserToDeliver_status
  } = useSelector(booksS);
  const dispatch = useDispatch();



  useEffect(() => {
    token && !currentUser && dispatch(AuthWithToken());
  }, [currentUser, token]);
  useEffect(() => { 
    console.log(window.innerWidth);

    window.addEventListener('resize',()=> setWidth(window.innerWidth));
    return () => window.removeEventListener('resize', setWidth(window.innerWidth))
   
  },[]);

  useEffect(() => {
    logINStatus === "succeeded" && !currentUser && dispatch(getUser());
  }, [logINStatus, currentUser,]);
  useEffect(() => {
    id !== currentUser?._id && dispatch(getUser());
  }, [id]);
  useEffect(() => {
     dispatch(getUser());
  }, [    changeUserToDeliver_status  ]);

  return (
    <div className="container-fluid">
      <div>
        <PrimarySearchAppBar />
        <div className={`${width > 1920 && "container"} d-md-flex`}>
          <div className="col-md-2 min-vh-100  d-none d-md-block">
            <BooksUserInterested />
          </div>
          <div
            style={{
              position: "relative",
            }}
            className="col-md-8 min-vh-100"
          >
            <Outlet />
            <Tooltip
              placement="top-end"
              TransitionComponent={Zoom}
              title="הוסף ספר"
            >
              <IconButton
                onClick={() => {
                  if(currentUser)
                  nav("/addBook");
                  else
                  toast.info("נא התחבר") && nav("/login")

                }}
                sx={
                  window.innerWidth > 768
                    ? {
                        // border:"2px solid black",
                        position: "fixed",
                        left: "300px",
                        bottom: "100px",
                        zIndex: "99",
                      }
                    : {
                        // border:"2px solid black",
                        position: "fixed",
                        left: "30px",
                        bottom: "100px",
                        zIndex: "99",
                      }
                }
                aria-label="add"
                className={`${style_css.addBtn}`}
              >
                <MdAddCircleOutline size="60px" />
              </IconButton>
            </Tooltip>
          </div>
          <div className="col-md-2  d-none d-md-block min-vh-100">
            <BooksOnDeliver />
          </div>
        </div>
        <div>
          {/* <hr /> */}
          <Footer />
        </div>
      </div>
    </div>
  );
}
