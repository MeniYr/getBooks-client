import React, { useEffect, useState } from "react";
import { MdArrowLeft, MdOutlineSwitchLeft, MdSwitchLeft } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import UseBookPerPage from "../../../shared/hooks/useBookPerPage";
import { booksS, getBooks } from "../../../shared/redux/features/bookSlice";
import Book from "./book";

export default function RecentlyAdded() {
  const { addBook_status,books, getBooks_status } = useSelector(booksS);
const [pageNumber, setPageNumber] = useState(1)
  const dispatch = useDispatch();

  useEffect(() => {
      dispatch(getBooks());
      
    }, [addBook_status]);
    
    // const {loading,error,books,hasMore} = UseBookPerPage(pageNumber)
  return (
    <div className="container">
      <h3 className="pt-2 ">הועלו לאחרונה</h3>
      {books && (
        <div style={{}} className=" d-md-flex flex-md-row overflow-scroll flex-nowrap wrap-hiden">
          {books?.map((item) => {
            return (
              <div className="p-2 col-md-3" key={item._id}>
                <Book book={item} />
              </div>
            
            );
        })}
        <><MdArrowLeft/></>
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
