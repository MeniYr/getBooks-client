import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  booksS,
  bookStatus,
  getAllBooks,
  getAllMyBooks,
  getBooks,
  getMyBooks,
  myBooksStatus,
} from "../../../shared/redux/features/bookSlice";
import {
  userID,
  user_from_token,
} from "../../../shared/redux/features/tokenSlice";
import {
  getCurrentUser,
  getUsersSlice,
} from "../../../shared/redux/features/usersSlice";
import Book from "./book";

export default function MyBooks() {
  const dispatch = useDispatch();
  const nav = useNavigate();
  // const { books } = useSelector(getAllBooks);
  // const {get_myBooks} = useSelector(getMyBooks);
  // const status = useSelector(myBooksStatus);
  const { userBooks, getAllMyBooks_status } = useSelector(booksS);
  // const {id} = useSelector(user_from_token);

  const { currentUser } = useSelector(getUsersSlice);

  useEffect(() => {
    currentUser !== null && dispatch(getAllMyBooks());
  }, []);

  useEffect(() => {
    currentUser === null && toast.info("נא התחבר") && nav("/login");
  }, []);

  return (
    <div className="container">
      {getAllMyBooks_status === "succeeded" && (
        <div style={{}} className="flex-wrap d-flex justify-content-center">
          {userBooks?.map((item) => {
            return (
              <div className="p-2 " key={item._id}>
                <Book book={item} />
              </div>
            );
          })}
        </div>
      )}
      {getAllMyBooks_status === "loading" && (
        <div className="d-flex justify-content-center border vh-100 align-items-center">
          <div className="display-6 ">טוען...</div>
        </div>
      )}
      {getAllMyBooks_status === "failed" ||
        (userBooks === undefined && (
          <div className="d-flex justify-content-center border vh-100 align-items-center">
            <div className="display-6 ">בעיה בשרת אנא נסה שוב מאוחר יותר.</div>
          </div>
        ))}
    </div>
  );
}
