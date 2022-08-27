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
import { booksS, getBooks, myBooks } from "../shared/redux/features/bookSlice";
import {
  user_from_token,
  user_name,
} from "../shared/redux/features/tokenSlice";
import { getUsersSlice } from "../shared/redux/features/usersSlice";

export default function Home() {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const user = useSelector(user_from_token);

  const { currentUser } = useSelector(getUsersSlice);
  const { bookJustLoaded } = useSelector(booksS);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    currentUser?._id && dispatch(myBooks(currentUser?._id))
    // currentUser?._id && dispatch(myBooks(currentUser?._id));
  }, [currentUser]);

  return (
    <div
      style={{
        position: "relative",
        minHeight: "inherit",
      }}
      className="border"
    >
      {/* <button
        style={{
          position: "fixed",
          bottom: "50px",
          left: "50px",
          borderRadius:"50%",
          width:"60px",
          height:"60px",
          // padding:"10px"
          display:"flex",
          alignItems:"center",
          justifyContent:"center",
          fontSize:"2em"
        }}
      >
        +
      </button> */}
      {/* <IconButton
      onClick={()=>nav("/addBook")}
        sx={{
          // border:"2px solid black",
          position: "fixed",
          left: "250px",
          bottom: "50px",
          zIndex:"99"
        }}
        aria-label="add"
        color="primary"
      >
        <MdAddCircleOutline size="60px" />
      </IconButton> */}
    </div>
  );
}
