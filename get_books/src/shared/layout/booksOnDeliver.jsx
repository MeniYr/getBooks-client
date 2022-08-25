import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { booksS, myBooks } from "../redux/features/bookSlice";
import { getCurrentUser } from "../redux/features/usersSlice";

export default function BooksOnDeliver() {
  const dispatch = useDispatch();
  const user = useSelector(getCurrentUser);
  const { userOnDeliveryBooks, myBooks_status } = useSelector(booksS);

  useEffect(() => {
    user?._id && dispatch(myBooks(user._id));
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
                className="p-2 border border-success my-auto d-flex align-items-center rounded-2"
              >
                <div className="d-flex  justify-content-between w-100">
                  <p className=" my-auto col-8">
                    {book.name.length > 12
                      ? book.name.substring(0, 12) + "..."
                      : book.name}
                  </p>
                  <button className="btn btn-warning badge col-4 my-auto">
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
