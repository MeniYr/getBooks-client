import { Button, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import { GrAddCircle } from "react-icons/gr";
import {
  MdAddBox,
  MdAddchart,
  MdAddCircleOutline,
  MdNoteAdd,
} from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import BooksOnDeliver from "./booksOnDeliver";
import BooksUserInterested from "./booksUserInterested";
import PrimarySearchAppBar from "../shared/layout/navbar";
import { booksS, getBooks } from "../shared/redux/features/bookSlice";
import {
  AuthWithToken,
  user_from_token,
  user_name,
} from "../shared/redux/features/tokenSlice";
import { getUser, getUsersSlice } from "../shared/redux/features/usersSlice";
import RecentlyAdded from "./userCMS/bookStory/recentlyAdded";
import style_css from "../shared/layout/layoutCss.module.css";
import HighRetes from "./userCMS/bookStory/highRatingBooks";

export default function Home() {
  const dispatch = useDispatch();
  const nav = useNavigate();
  // const user = useSelector();

  const { id } = useSelector(user_from_token);
  const { bookJustLoaded } = useSelector(booksS);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const { currentUser } = useSelector(getUsersSlice);

  // useEffect(() => {
  // id!==""&&dispatch(AuthWithToken())
  // currentUser?._id && dispatch(myBooks(id))
  // currentUser?._id && dispatch(myBooks(id));
  // }, [id]);



  return (
    <div className={` ${window.innerWidth>768 && "shadow"} p-2 bg-gradient m-2 mt-3  d-block`}>
     {window.innerWidth<768 && <div>
      <h1 className="display-1 fw-bolder shadow w-75 text-center p-2 mx-auto rounded-circle" style={{color:"#557EC7"}}>Get Books</h1>
      </div>
      }
      <div className={`${style_css.recently} p-2`}>
        <RecentlyAdded />
      </div>
      <hr />
      <div className={`${style_css.categories} p-2`}>
        <HighRetes />
      </div>
    </div>
  );
}
