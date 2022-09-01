import moment from "moment";
import React, { useEffect, useState } from "react";
import ReactStars from "react-rating-stars-component";
import { useDispatch, useSelector } from "react-redux";
import { books, booksS, getBooks } from "../shared/redux/features/bookSlice";
import Book from "./userCMS/bookStory/book";
import { GrFavorite } from "react-icons/gr";
import { MdOutlineFavorite } from "react-icons/md";
import { Button, IconButton, Tooltip } from "@mui/material";
import {
  addNotify,
  getUser,
  getUsers,
  getUsersSlice,
  isUserClickForNotifyAlready,
} from "../shared/redux/features/usersSlice";
import { toast } from "react-toastify";
import {
  addInterestedID,
  createDelivery,
  delInterestedID,
  delivery,
  getDeliveries,
} from "../shared/redux/features/deliverySlice";
import { Link, useNavigate } from "react-router-dom";
import { useRef } from "react";
import Delivery from "../shared/components/delivery";
import { user_from_token } from "../shared/redux/features/tokenSlice";
import { BOOKS } from "../shared/constants/globalinfo/URL`S";
import { doApiMethod } from "../shared/services/apiService";
import useExist_notify from "../shared/hooks/useExist_notify";
import UseExist_notify from "../shared/hooks/useExist_notify";
// import { delivery, getDeliveries } from '../shared/redux/features/deliverySlice'

export default function Search() {
  const dispatch = useDispatch();
  const nav = useNavigate();

  // selectors
  const { srchBooks_status, srchRes, sendBookMassage_status, books } =
    useSelector(booksS);
  const { id, error } = useSelector(user_from_token);
  const { addNote_status, msg_status, currentUser, userNotifyAlready, users } =
    useSelector(getUsersSlice);
  const { deliveries } = useSelector(delivery);

  // states
  const [innerWidthSize, setInnerWidthSize] = useState(window.innerWidth);
  const [notifyClicked, setNotifyClicked] = useState(false);
  const [notify, setNotify] = useState({});
  const [readMore, setReadMore] = useState(false);

  //
  // HooksMade
  // const getNotify = UseNotify(notify);

  // rating func
  const rating = async (obj) => {
    console.log(obj.e);
    let isInt = Number.isInteger(obj.e);
    let num = Number(obj.e);
    if (!isInt && Math.ceil(num) > num) {
      num = Math.floor(num) + 0.5;
    }
    let sendRate = await doApiMethod(
      `${BOOKS}/addRate/${obj.item._id}`,
      "PUT",
      { num }
    );
    dispatch(getBooks());
    console.log(sendRate?.rate);
  };

  // screen size check
  useEffect(() => {
    window.addEventListener("resize", () => {
      setInnerWidthSize(window.innerWidth);
    });

    return () => {
      window.addEventListener("resize", () => {
        setInnerWidthSize(window.innerWidth);
      });
    };
  }, [innerWidthSize]);

  // get delivers
  useEffect(() => {
    dispatch(getDeliveries());
    return () => {
      dispatch(getDeliveries());
    };
  }, [notifyClicked, notify, addNote_status]);

  useEffect(() => {
    // (getUsers());
    dispatch(getBooks());
  }, []);

  const onClickInterested = (note) => {
    console.log("onClickInterested");
    // console.log(exist.error);
    // exist.error && toast.info("נא התחבר");
    if (currentUser !== null) {
      console.log(note);
      dispatch(addNotify(note));
      dispatch(addInterestedID(note?.bookID));
      setNotifyClicked(!notifyClicked);
    } else {
      toast.info("נא התחבר");
      nav("/login");
    }
  };

  return (
    <div className="container d-flex align-items-center justify-content-center mt-5 pb-5">
      <div
        style={{
          width: "auto",
        }}
        className="row"
      >
        <div className=" p-2 ">
          {srchBooks_status === "succeeded" &&
            srchRes?.length > 0 &&
            srchRes?.map((item, i) => {
              return (
                <div key={item._id}>
                  <div className="d-md-flex flex-wrap   p-2 ">
                    {/* right */}
                    <div className="d-md-flex flex-wrap justify-content-center">
                      {/* img */}
                      <div className="ps-3">
                        <Link
                          className="text-body text-decoration-none"
                          to={`/fullBook/${item._id}`}
                        >
                          <img
                            className="shadow rounded-1"
                            src={
                              item.image
                                ? item.image
                                : "https://images.unsplash.com/photo-1576872381149-7847515ce5d8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2536&q=80"
                            }
                            alt="book pic"
                            width={177}
                            height={279}
                          />
                        </Link>
                      </div>

                      {/* props */}
                      <div>
                        <Link
                          className="text-body text-decoration-none"
                          to={`/fullBook/${item._id}`}
                        >
                          <h2>{item.name}</h2>
                        </Link>
                        <p>{item.author}</p>
                        <ReactStars
                          count={5}
                          size={30}
                          activeColor="#ffd700"
                          onChange={(e) =>
                            currentUser !== null && rating({ item, e })
                          }
                          value={item?.rate / item?.rateQuanity}
                          a11y={false}
                          isHalf={false}
                          edit={
                            currentUser !== null &&
                            currentUser?._id !== item.userID._id
                              ? true
                              : false
                          }
                        />
                        <article className="d-flex">
                          <p className="border-start border-opacity-50 ps-1 border-dark">
                            {item.cat_id.category}
                          </p>
                          <p className="border-start border-opacity-50 px-1 border-dark">
                            {item.publishing_year}
                          </p>
                          <p className="border-start border-opacity-50 px-1 border-dark">
                            {item.pages} עמודים{" "}
                          </p>
                          <p className="pe-1">
                            הועלה {moment(item.created_at).format("DD/MM/YYYY")}
                          </p>
                        </article>
                        <p
                          style={{
                            width: innerWidthSize < 768 ? "auto" : "500px",
                          }}
                          className="overflow-auto"
                        >
                          {item.description.length > 300
                            ? item.description.substring(0, 300) + "..."
                            : item.description}
                        </p>
                        {item.description.length > 300 && (
                          <div>
                            <button
                              className="btn btn-outline-info"
                              onClick={() => setReadMore(!readMore)}
                            >
                              {!readMore ? "קרא עוד" : "הצג פחות"}
                            </button>
                            {readMore && (
                              <p>{item.description.substring(300)}</p>
                            )}
                          </div>
                        )}

                        {/* favs */}
                         <div className="d-flex align-items-center justify-content-between">
                          {/* <Tooltip
                            title="הוספה למועדפים"
                            placement="bottom-end"
                          >
                            <p
                              className="fs-5 mt-md-2"
                              style={{
                                cursor: "pointer",
                              }}
                            >
                              &nbsp;
                              <GrFavorite />
                              <MdOutlineFavorite />
                            </p> 
                          </Tooltip> */}
                          <br />

                          {currentUser?._id !== item.userID._id && (
                            <IconButton
                              className={`shadow ${
                                deliveries
                                  ?.find((a) => a.bookID === item._id)
                                  ?.interestedUsersID?.includes(
                                    currentUser?._id
                                  ) ? (
                                  "bg-info"
                                ) : (
                                  <></>
                                )
                              }`}
                              onClick={() => {
                                // error&&toast.info("נא התחבר")&&
                                // nav("/login")
                                console.log("onClick");
                                let notify = {
                                  fromUserId: currentUser?._id,
                                  toUserId: item?.userID?._id,
                                  bookID: item._id,
                                };

                                setNotify(notify);
                                onClickInterested(notify);

                                // setOpenModal(true)
                              }}
                            >
                              {deliveries
                                ?.find((a) => a.bookID === item._id)
                                ?.interestedUsersID?.includes(
                                  currentUser?._id
                                ) ? (
                                <>🔖</>
                              ) : (
                                <></>
                              )}
                              מעוניין
                            </IconButton>
                          )}
                        </div>
                      </div>
                      {/* <Book book={item} /> */}
                    </div>

                    {/* left */}
                    {/* TODO USER PROFILE */}
                    {currentUser !== null &&
                      currentUser?._id !== item.userID._id && (
                        <div
                          className="bg-light d-flex shadow-lg rounded-circle p-4"
                          style={{
                            minWidth: "160px",
                            height: "160px",
                          }}
                        >
                          <div className="my-auto mx-auto text-center text-wrap fw-bolder">
                            <p className="text-muted ">
                              משתמש: {item.userID?.name}
                            </p>
                            {/* <p className='text-muted '> עיר: {item.userID?.city}</p> */}
                            <button
                              onClick={() => {
                                nav(`/sendMsg/${item.userID?._id}`);
                              }}
                              className="btn btn-outline-info rounded-circle"
                            >
                              הודעה
                            </button>
                          </div>
                        </div>
                      )}
                  </div>

                  {i < srchRes.length - 1 && <hr />}
                </div>
              );
            })}
          {srchBooks_status === "loading" && <div>Loading...</div>}
          {srchBooks_status === "failed" && <div>server problem try again</div>}
        </div>
      </div>
    </div>
  );
}
