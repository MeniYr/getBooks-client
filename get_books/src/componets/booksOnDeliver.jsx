import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  booksS,
  getAllMyBooks,
  getBooks,
} from "../shared/redux/features/bookSlice";
import {
  changeOwner,
  delivery,
  getDeliveries,
} from "../shared/redux/features/deliverySlice";
import { user_from_token } from "../shared/redux/features/tokenSlice";
import {
  getCurrentUser,
  getUser,
  getUsers,
  getUsersSlice,
} from "../shared/redux/features/usersSlice";
import Confetti from "react-confetti";
import { useRef } from "react";
import moment from "moment";
import { Tooltip } from "@mui/material";
import { current } from "@reduxjs/toolkit";

export default function BooksOnDeliver() {
  const dispatch = useDispatch();
  const { currentUser } = useSelector(getUsersSlice);
  const {
    userOnDeliveryBooks,
    getAllMyBooks_status,
    userBooks,
    swichHide_status,
  } = useSelector(booksS);
  const { logINStatus } = useSelector(user_from_token);
  const { changeOwner_status } = useSelector(delivery);
  const [book, setBook] = useState([]);
  const [dateCulc, setDateCulc] = useState("");
  const [deliverClicked, setDeliverClicked] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const dateRef = useRef();

  useEffect(() => {
    if (currentUser) dispatch(getUser());
    dispatch(getAllMyBooks());
  }, [refresh, swichHide_status, userOnDeliveryBooks, changeOwner_status,logINStatus]);

  useEffect(() => {
    let array = [];
    if (userBooks.length > 0) {
      array = [...userBooks];
      console.log(array);
      setBook(array.filter((item) => item.hide === true));
    }

    culcDays();
    userBooks.length > 0 && console.log(book);
  }, [
    currentUser,
    refresh,
    swichHide_status,
    userOnDeliveryBooks,
    getAllMyBooks_status,
  ]);

  const culcDays = () => {
    let first = new Date(moment(book?.created_at)).getUTCDate();
    let now = new Date().getUTCDate();

    setDateCulc(now - first);
  };

  return (
    <div className="container position-relative">
      <div className="row p-2 d-flex justify-content-center text-center">
        <p className="">בתהליך מסירה</p>
        {getAllMyBooks_status === "succeeded" &&
          currentUser &&
          book?.map((book) => {
            return (
              <div
                key={book._id}
                style={{
                  height: "50px",
                }}
                className="p-2  mb-2 border border-success my-auto d-flex align-items-center rounded-2"
              >
                <div className="d-flex  justify-content-between w-100">
                  <Tooltip
                    title="ימים שעברו"
                    className={`${dateCulc > 1 && "bg-warning"} ${
                      dateCulc > 2 && "bg-danger"
                    } ${dateCulc < 1 && "bg-success"} badge my-auto  m-0 `}
                  >
                    <p class=""> {dateCulc}</p>
                  </Tooltip>
                  <Link
                    to={`/fullBook/${book._id}`}
                    className="text-decoration-none text-body my-auto fs-6 fw-semibold col-7 "
                  >
                    {book.name.length > 10
                      ? book.name.substring(0, 10) + "..."
                      : book.name}
                  </Link>
                  <button
                    onClick={() => {
                      dispatch(changeOwner(book._id));
                      setDeliverClicked(true);
                      setRefresh(!refresh);
                    }}
                    className="btn btn-warning badge  my-auto"
                  >
                    נמסר
                  </button>
                </div>
                {deliverClicked && (
                  <Confetti
                  className="position-fixed"
                    numberOfPieces={700}
                    recycle={false}
                    // width="500px"
                    // height="500px"
                  />
                )}
              </div>
            );
          })}
      </div>
      {book.length === 0 && (
        <p className="d-flex justify-content-center text-center">
          עדיין אין 😏
        </p>
      )}
    </div>
  );
}
