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
import BooksUserInterested from "../shared/layout/booksUserInterested";
import PrimarySearchAppBar from "../shared/layout/navbar";
import { booksS, getBooks } from "../shared/redux/features/bookSlice";
import {
  AuthWithToken,
  user_from_token,
  user_name,
} from "../shared/redux/features/tokenSlice";
import { getUsersSlice } from "../shared/redux/features/usersSlice";
import RecentlyAdded from "./userCMS/bookStory/recentlyAdded";
import style_css from "./layoutCss.module.css";

export default function Home() {
  const dispatch = useDispatch();
  const nav = useNavigate();
  // const user = useSelector();

  const { id } = useSelector(user_from_token);
  const { bookJustLoaded } = useSelector(booksS);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [openModal, setOpenModal] = useState(false);

  // useEffect(() => {
    // id!==""&&dispatch(AuthWithToken())
    // currentUser?._id && dispatch(myBooks(id))
    // currentUser?._id && dispatch(myBooks(id));
  // }, [id]);


  return (
    <div
      style={{
      }}
      className="border d-block"
    >
      <div className={`${style_css.recently} p-2`}>

<RecentlyAdded />
      </div>
      <div className={`${style_css.categories} p-2`}>
        categories
      </div>
    </div>
  );
}
