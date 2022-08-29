import React, { useEffect, useState } from "react";
import { MdArrowLeft, MdOutlineSwitchLeft, MdSwitchLeft } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { BOOKS } from "../../../shared/constants/globalinfo/URL`S";
import UseBookPerPage from "../../../shared/hooks/useBookPerPage";
import { booksS, getBooks } from "../../../shared/redux/features/bookSlice";
import Book from "./book";
import style_css from "./books.module.css";

export default function RecentlyAdded() {
  const { addBook_status, books, getBooks_status } = useSelector(booksS);
  const [newBooks, setNewBooks] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBooks());
    const q = () => {
      return books?.slice(-7);
    };
    setNewBooks(q());
    q();
  }, [addBook_status]);

  // const {loading,error,books,hasMore} = UseBookPerPage(pageNumber)
  return (
    <div className="container">
      <h3 className="pt-2 ">הועלו לאחרונה</h3>
      {newBooks && (
        <div style={{ overflowY: "scroll" }} className=" d-md-flex   ">
          {newBooks?.map((item) => {
            return (
              <div className="p-2 col-md-3" key={item._id}>
                <Book book={item} />
              </div>
            );
          })}
          <>
            <MdArrowLeft />
          </>
        </div>
      )}
      {getBooks_status === "loading" && (
        <div className="d-flex justify-content-center border vh-100 align-items-center">
          <div className="display-6 ">טוען...</div>
        </div>
      )}
      {getBooks_status === "failed" && (
        <div className="d-flex justify-content-center border vh-100 align-items-center">
          <div className="display-6 ">בעיה בשרת אנא נסה שוב מאוחר יותר.</div>
        </div>
      )}
    </div>
  );
}
