import { Tooltip } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { booksS, getBooks } from "../shared/redux/features/bookSlice";
import {
  changeOwner,
  delivery,
  getDeliveries,
} from "../shared/redux/features/deliverySlice";
import { user_from_token } from "../shared/redux/features/tokenSlice";
import { getUsersSlice } from "../shared/redux/features/usersSlice";

export default function BooksUserInterested() {
  const dispatch = useDispatch();
  const { id, error, logINStatus } = useSelector(user_from_token);
  const { deliveries, addInterestedID_status } = useSelector(delivery);
  const { addNote_status, currentUser } = useSelector(getUsersSlice);
  const [interestedBooksId, setInterestedBooksId] = useState([]);
  const [newBooks, setNewBooks] = useState([]);
  const {
    books,
    userOnDeliveryBooks,
    getAllMyBooks_status,
    userBooks,
    swichHide_status,
  } = useSelector(booksS);

  useEffect(() => {
    // dispatch(getBooks())
    currentUser&& a();
  }, [deliveries,currentUser]);

  useEffect(() => {
    // if(currentUser){
          dispatch(getDeliveries());
    a();
    // }

  }, [
    addNote_status,
    getAllMyBooks_status,
    addInterestedID_status,
    logINStatus,
  ]);
  const a = () => {
    let array = [];
    console.log(deliveries?.length);
    if (deliveries?.length > 0) {
      console.log(deliveries);
      array = [...deliveries];
      // let exist = false;
      let arr = [];
      for (let i = 0; i < array?.length; i++) {
        let book = deliveries[i]?.interestedUsersID;
        if (book.includes(currentUser?._id)) {
          arr.push(deliveries[i]?.bookID);
        }
      }
      setInterestedBooksId(arr);
    }
  };
  return (
    <div className="container ">
      <div className="row p-2 d-flex justify-content-center ">
        <p className="text-center">ספרים שהתעניינתי</p>
        {getAllMyBooks_status === "succeeded" &&
          currentUser &&
          books?.map((book) => {
            return (
              interestedBooksId.includes(book._id) && (
                <div
                  key={book?._id}
                  style={{
                    minHeight: "50px",
                  }}
                  className="p-2 mb-2 col-12 border border-success  d-flex align-items-center rounded-2"
                >
                  <div className="d-flex justify-content-between align-items-center w-100">
                    <div
                    className="">
                      <Link
                        to={`/fullBook/${book._id}`}
                        className="text-decoration-none text-body  fs-md-6 fw-semibold  "
                      >
                        { book.name}
                         
                      </Link>
                    </div>

                    <div >
 
                      <img
                        src={book.image}
                        width="35px"
                        height="35px"
                        alt="book photo"
                      />
                    </div>
                  </div>
                </div>
              )
            );
          })}
      </div>
      {interestedBooksId?.length === 0 && (
        <p className="d-flex justify-content-center text-center">
          עדיין אין 😏
        </p>
      )}
    </div>
  );
}
