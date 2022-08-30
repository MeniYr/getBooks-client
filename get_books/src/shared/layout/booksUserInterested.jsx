import { Tooltip } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { booksS } from "../redux/features/bookSlice";
import {
  changeOwner,
  delivery,
  getDeliveries,
} from "../redux/features/deliverySlice";
import { user_from_token } from "../redux/features/tokenSlice";
import { getUsersSlice } from "../redux/features/usersSlice";

export default function BooksUserInterested() {
  const dispatch = useDispatch(getDeliveries());
  const { id, error } = useSelector(user_from_token);
  const { deliveries } = useSelector(delivery);
  const { addNote_status, currentUser } = useSelector(getUsersSlice);
  const [interestedBooks, setInterestedBooks] = useState([]);
  const {
    userOnDeliveryBooks,
    getAllMyBooks_status,
    userBooks,
    swichHide_status,
  } = useSelector(booksS);

  useEffect(() => {
    dispatch(getDeliveries());
    const a = () => {
      let array = [];
      if (deliveries?.length > 0) {
        console.log(deliveries);
        array = [...deliveries];
        // let exist = false;
        let arr=[];
        for (let i = 0; i < array?.length; i++) {
          let book = array[i]?.interestedUsersID;
          if (book.includes(currentUser?._id)) {
           arr.push(array[i]?.bookID)
          }
        }
        setInterestedBooks(arr)
        console.log(interestedBooks);
      }
    };

    a();

    // setInterestedBooks(a());
    interestedBooks?.length > 0 && console.log(interestedBooks);
  }, [addNote_status, getAllMyBooks_status]);

  return (
    <div className="container ">
      <div className="row p-2 d-flex justify-content-center text-center">
        <p className="">ספרים שהתעניינתי</p>
        {getAllMyBooks_status === "succeeded" &&
          currentUser &&
          interestedBooks?.map((book) => {
            return (
              <div
                key={book?._id}
                style={{
                  height: "50px",
                }}
                className="p-2 mb-2 border border-success my-auto d-flex align-items-center rounded-2"
              >
                <div className="d-flex  justify-content-between w-100">
                  <Link
                    to={`/fullBook/${book._id}`}
                    className="text-decoration-none text-body my-auto fs-6 fw-semibold col-7 "
                  >
                    {book?.name?.length > 10
                      ? book.name.substring(0, 10) + "..."
                      : book.name}
                  </Link>
                  {/* <button
                    onClick={() => {
                      dispatch(changeOwner(book._id));
                      setDeliverClicked(true);
                      setRefresh(!refresh);
                    }}
                    className="btn btn-warning badge  my-auto"
                  >
                    נמסר
                  </button> */}
                </div>
              </div>
            );
          })}
      </div>
      {interestedBooks?.length === 0 && (
        <p className="d-flex justify-content-center text-center">
          עדיין אין 😏
        </p>
      )}
    </div>
  );
}
