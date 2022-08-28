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

export default function BooksOnDeliver() {
  const dispatch = useDispatch();
  const user = useSelector(getCurrentUser);
  const { userOnDeliveryBooks, getAllMyBooks_status, userBooks, swichHide_status } =
    useSelector(booksS);
  const { id } = useSelector(user_from_token);
  const { changeOwner_status } = useSelector(delivery);
  const [book, setBook] = useState([]);

  useEffect(() => {

    if (id !== "") {
      dispatch(getAllMyBooks());
    }
  }, [id,swichHide_status,changeOwner_status]);

  useEffect(() => {
    setBook(userBooks.filter((item) => item.hide === true));
  }, [id,swichHide_status,userBooks]);

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
                  <Link
                    to={`/fullBook/${book._id}`}
                    className="text-decoration-none text-body my-auto col-8"
                  >
                    {book.name.length > 12
                      ? book.name.substring(0, 12) + "..."
                      : book.name}
                  </Link>
                  <button
                    onClick={() => {
                      dispatch(changeOwner(book._id));
                      // dispatch(myBooks(user?._id));
                    }}
                    className="btn btn-warning badge col-4 my-auto"
                  >
                    נמסר
                  </button>
                </div>
              </div>
            );
          })}
      </div>
      {book.length === 0 && <p className="d-flex justify-content-center text-center">עדיין אין 😏</p>}
    </div>
  );
}
