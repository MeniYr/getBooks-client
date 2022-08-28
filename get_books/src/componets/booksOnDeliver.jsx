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
} from "../shared/redux/features/usersSlice";
import Confetti from "react-confetti";
import { useRef } from "react";
import moment from "moment";
import { Tooltip } from "@mui/material";

export default function BooksOnDeliver() {
  const dispatch = useDispatch();
  const user = useSelector(getCurrentUser);
  const {
    userOnDeliveryBooks,
    getAllMyBooks_status,
    userBooks,
    swichHide_status,
  } = useSelector(booksS);
  const { id } = useSelector(user_from_token);
  const { changeOwner_status } = useSelector(delivery);
  const [book, setBook] = useState([]);
  const [dateCulc, setDateCulc] = useState("");
  const [deliverClicked, setDeliverClicked] = useState(false);
  const dateRef = useRef();

  useEffect(() => {
    if (id !== "") {
      dispatch(getAllMyBooks());
    }
  }, [id, swichHide_status, changeOwner_status]);

  useEffect(() => {
    setBook(userBooks.filter((item) => item.hide === true));
    culcDays();
  }, [id, swichHide_status, userBooks]);

  const culcDays = () => {
    let first = new Date(moment(book?.created_at)).getUTCDate();
    let now = new Date().getUTCDate();
 
    setDateCulc(now-first);
  };

  return (
    <div className="container ">
      <div className="row p-2 d-flex justify-content-center text-center">
        <p className="">בתהליך מסירה</p>
        {getAllMyBooks_status === "succeeded" &&
          book?.map((book) => {
            return (
              <div
                key={book._id}
                style={{
                  height: "50px",
                }}
                className="p-2 mb-2 border border-success my-auto d-flex align-items-center rounded-2"
              >
                <div className="d-flex  justify-content-between w-100">
                  {/* <div
                    onClick={() => {}}
                    style={{ cursor: "pointer" }}
                    className="text-secondary col-2 p-o m-0"
                  >
                    x
                  </div> */}
                  {/* <div className="badge badge-success">
   
   </div> */}
                  <Tooltip title="ימים שעברו" className={`${dateCulc>1&&"bg-warning"} ${dateCulc>2&&"bg-danger"} ${dateCulc<1&&"bg-success"} badge  my-auto col-1 ms-0`}>
                    <p class=" "> {dateCulc}</p>
                  </Tooltip>
                  <Link
                    to={`/fullBook/${book._id}`}
                    className="text-decoration-none text-body my-auto col-7 "
                  >
                    {book.name.length > 16
                      ? book.name.substring(0, 16) + "..."
                      : book.name}
                  </Link>
                  <button
                    onClick={() => {
                      dispatch(changeOwner(book._id));
                      setDeliverClicked(true);
                    }}
                    className="btn btn-warning badge col-2 my-auto"
                  >
                    נמסר
                  </button>
                  {/* {deliverClicked &&
                        <Confetti
                        width="500px"
                        height="500px"
                      />
                    } */}
                </div>
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
