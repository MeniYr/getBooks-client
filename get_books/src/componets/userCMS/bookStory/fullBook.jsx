import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

import { getUsersSlice } from "../../../shared/redux/features/usersSlice";
import "./books.module.css";
import {
  booksS,
  findBook,
  getBooks,
} from "../../../shared/redux/features/bookSlice";
import ReactStars from "react-rating-stars-component";
import SendMsg from "../userStorey/sendMsg";
import { user_from_token } from "../../../shared/redux/features/tokenSlice";
import { doApiMethod } from "../../../shared/services/apiService";
import { BOOKS } from "../../../shared/constants/globalinfo/URL`S";

export default function FullBook() {
  const dispatch = useDispatch();
  const { id } = useSelector(user_from_token);
  const [openMsg, setOpenMsg] = useState(false);
  const { currentBook, sendBookMassage_status, currentBook_status } =
    useSelector(booksS);
  const { msg_status } = useSelector(getUsersSlice);
  const { bookId } = useParams();
  const [ratings, setRating] = useState(0)

  useEffect(() => {
    dispatch(getBooks());
  }, [currentBook]);

  useEffect(() => {
    dispatch(findBook(bookId));
    console.log(bookId);
  }, [bookId, openMsg, sendBookMassage_status, msg_status, currentBook_status]);

  const rating = async (rate_num) => {
    // console.log(rate_num);
    let isInt = Number.isInteger(rate_num);
    let num = Number(rate_num);
    if (!isInt && Math.ceil(num) > num) {
      num = Math.floor(num) + 0.5;
    }
    let sendRate = await doApiMethod(
      `${BOOKS}/addRate/${bookId }`,"PUT", {num}
    );
    dispatch(getBooks());
    console.log(sendRate?.rate)
  };

  return (
    <div>
      <div
        style={{
          position: "relative",
          width: "100%",
        }}
        className="p-2"
      >
        <div
          style={{
            backgroundImage: `url(${currentBook?.image})`,
            backgroundPosition: "center",
            filter: "blur(11px)",
            // opacity:0.3,
            height: "350px",
          }}
        ></div>

        <div
          style={{
            position: "absolute",
            top: "50px",
            right: "50px",
          }}
          className="d-flex text-white"
        >
          <div>
            <img
              className=" shadow"
              width="185"
              height="250"
              src={currentBook?.image}
              alt={currentBook?.name}
            />
          </div>
          <div className="pe-4">
            <h3>{currentBook?.name}</h3>
            <h4>{currentBook?.author}</h4>
            <ReactStars
              count={5}
              size={30}
              activeColor="#ffd700"
              onChange={(e) => rating(e)}
              value={currentBook?.rate/currentBook?.rateQuanity}
              a11y={true}
              isHalf={true}
              edit={id !== currentBook?.userID?._id ? true : false}
            />
          </div>
        </div>

        <div className="mt-5">
          <div className="d-flex justify-content-between px-5">
            <p>
              <span className="fw-bolder">עמודים: </span> {currentBook?.pages}
            </p>
            <p>
              <span className="fw-bolder"> שנת הוצאה לאור: </span>{" "}
              {currentBook?.publishing_year}
            </p>
            <p>
              <span className="fw-bolder"> הועלה בתאריך: </span>{" "}
              {moment(currentBook?.created_at).format("DD/MM/YYYY")}
            </p>
          </div>
          <p className="overflow-auto text-center mx-auto w-75 border border-3 rounded-2 ">
            {currentBook?.description.length > 1000
              ? currentBook?.description.substring(0, 1000) + "..."
              : currentBook?.description}
          </p>
        </div>
        <div
          onClick={() => {
            setOpenMsg(true);
          }}
          className="btn"
        >
          הוסף תגובה
        </div>
        {openMsg && (
          <SendMsg
            bookId={currentBook?._id}
            msgClose={setOpenMsg}
            id={currentBook?.userID._id}
          />
        )}
        <div>
          {currentBook?.comments.map((comment) => {
            return (
              <div
                className="border mx-auto rounded-3 w-75 p-2 m-4 text-center"
                key={comment._id}
              >
                <h2>{moment(comment.date).format("DD-MM-YYYY, HH:mm")}</h2>
                <h2>
                  <span className="fw-bolder">מאת: </span>{" "}
                  {comment.fromUser.name}
                </h2>
                <p className="display-5 w-75 mx-auto border-3">
                  {" "}
                  <span className="fw-bolder">תוכן: </span>
                  {comment.msg}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
