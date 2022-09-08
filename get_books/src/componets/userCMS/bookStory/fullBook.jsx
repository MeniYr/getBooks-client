import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
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
  const { msg_status, currentUser } = useSelector(getUsersSlice);
  const { bookId } = useParams();
  const [ratings, setRating] = useState(0);
  const [readMore, setReadMore] = useState(false);
  const [commentsReadMore, setCommentsReadMore] = useState(false);

  const nav = useNavigate();

  useEffect(() => {
    dispatch(getBooks());
  }, [currentBook, sendBookMassage_status]);

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
    let sendRate = await doApiMethod(`${BOOKS}/addRate/${bookId}`, "PUT", {
      num,
    });
    dispatch(getBooks());
    console.log(sendRate?.rate);
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
          className="d-md-flex text-white"
        >
          <div>
            <img
              className=" shadow"
              width="185"
              height={`250`}
              src={currentBook?.image}
              alt={currentBook?.name}
            />
          </div>
          <div className={`pe-4  ${window.innerWidth < 768 ? "d-none" : 0} `}>
            <h3>{currentBook?.name}</h3>
            <h4>{currentBook?.author}</h4>

            <ReactStars
              count={5}
              size={30}
              activeColor="#ffd700"
              onChange={(e) => currentUser !== null && rating(e)}
              value={currentBook?.rate / currentBook?.rateQuanity}
              a11y={true}
              isHalf={true}
              edit={
                currentUser !== null &&
                currentUser?._id !== currentBook?.userID?._id
                  ? true
                  : false
              }
            />
          </div>
        </div>

        <div className="d-md-flex mt-5">
          <div className="d-block col-md-3 px-5">
            <hr />
            {window.innerWidth < 768 && (
              <p className="fw-bolder">{currentBook?.name}</p>
            )}
            {window.innerWidth < 768 && (
              <p className="fw-semibold ">{currentBook?.author}</p>
            )}
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
            {currentUser&&<div>
              <span className="fw-bolder">משתמש:</span>{" "}
              {currentBook?.userID.name}
              <button
                onClick={() => {
                  nav(`/sendMsg/${currentBook.userID?._id}`);
                }}
                className="btn badge text-black m-3 btn-outline-info rounded-circle"
              >
                הודעה
              </button>
            </div>}
          </div>
          <div className="col-md-9">
            <hr />
            <p className="overflow-auto  mx-auto w-75  ">
              {currentBook?.description.length > 300
                ? currentBook?.description.substring(0, 300) + "..."
                : currentBook?.description}
            </p>
            {currentBook?.description.length > 300 && (
              <div>
                <button
                  className="btn btn-outline-info"
                  onClick={() => setReadMore(!readMore)}
                >
                  {!readMore ? "קרא עוד" : "סגור "}
                </button>
                {readMore && (
                  <p className="  mx-auto w-75">
                    {currentBook?.description.substring(300,1500)}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>

        <hr className="my-4" />

        <div className="d-md-flex  ">
          <div className="col-md-3">
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
          </div>

          <div className="col-md-9">
            <p className="initialism fw-semibold fs-5 fst-italic">
              תגובות גולשים
            </p>
            <hr />
            {
              currentBook?.comments.map((comment, i) => {
                return (
                 i<6&& <div>
                    <div
                      className=" mx-auto d-md-flex p-2 m-4 text-end"
                      key={comment._id}
                    >
                      <div className="col-md-4 border-start">
                        <h2>
                          <span className="fw-bolder">מאת: </span>{" "}
                          {comment.fromUser.name}
                        </h2>
                        <h2>{moment(comment.date).format("DD-MM-YYYY")}</h2>
                      </div>

                      <div className="col-md-9 me-md-4 ">
                        <p className="fs-3 mx-auto "> {comment.msg}</p>
                      </div>
                    </div>
                    {i < currentBook?.comments.length && (
                      <hr className="display-1" />
                    )}
                  </div>
                );
              })}
            {currentBook?.comments.length > 7 && (
              <button className="btn" onClick={() => setCommentsReadMore(!commentsReadMore)}>קרא עוד</button>
            )}
            {commentsReadMore &&
              currentBook?.comments.map((comment, i) => {
                return (
                  i > 5 &&
                  i < 15 && (
                    <div>
                      <div
                        className=" mx-auto d-md-flex p-2 m-4 text-end"
                        key={comment._id}
                      >
                        <div className="col-md-4 border-start">
                          <h2>
                            <span className="fw-bolder">מאת: </span>{" "}
                            {comment.fromUser.name}
                          </h2>
                          <h2>{moment(comment.date).format("DD-MM-YYYY")}</h2>
                        </div>

                        <div className="col-md-9 me-md-4 ">
                          <p className="fs-3 mx-auto "> {comment.msg}</p>
                        </div>
                      </div>
                      {i < currentBook?.comments.length && (
                        <hr className="display-1" />
                      )}
                    </div>
                  )
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}
