import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { booksS, getBooks, myBooks } from "../shared/redux/features/bookSlice";
import {
  changeOwner,
  getDeliveries,
} from "../shared/redux/features/deliverySlice";
import {
  getCurrentUser,
  getUser,
  getUsers,
} from "../shared/redux/features/usersSlice";

export default function BooksOnDeliver() {
  const dispatch = useDispatch();
  const user = useSelector(getCurrentUser);
  const { userOnDeliveryBooks, myBooks_status } = useSelector(booksS);

  useEffect(() => {
    user?._id && dispatch(myBooks(user?._id));
    // dispatch(getBooks());
    user?._id && console.log(userOnDeliveryBooks);
    console.log(myBooks_status);
    // user?._id && dispatch(myBooks(user._id));
  }, [user]);

  return (
    <div className="container ">
      <div className="row p-2 d-flex justify-content-center text-center">
        <p className="">בתהליך מסירה</p>
        {myBooks_status === "succeeded" &&
          userOnDeliveryBooks?.map((book) => {
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
    </div>
  );
}
