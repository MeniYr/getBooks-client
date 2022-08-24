import moment from "moment";
import React, { useEffect, useState } from "react";
import ReactStars from "react-rating-stars-component";
import { useDispatch, useSelector } from "react-redux";
import { books, booksS } from "../shared/redux/features/bookSlice";
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
import Modal from "./modal";
import Delivery from "./userCMS/delivery";
// import { delivery, getDeliveries } from '../shared/redux/features/deliverySlice'

export default function Search() {
  const dispatch = useDispatch();
  const nav = useNavigate();

  const { srchBooks_status, srchRes, books } = useSelector(booksS);
  const { addNote_status, currentUser, userNotifyAlready, users } =
    useSelector(getUsersSlice);
  const { deliveries } = useSelector(delivery);
  const [innerWidthSize, setInnerWidthSize] = useState(window.innerWidth);
  const [notifyClicked, setNotifyClicked] = useState(false);
  const [isSameBook, setIsSameBook] = useState(false);
  const [notify, setNotify] = useState({});
  // const [openModal, setOpenModal] = useState(false)
  const buttonRef = useRef();
  // rating
  const rating = (rate_num) => {
    // console.log(rate_num);
    let isInt = Number.isInteger(rate_num);
    let num = Number(rate_num);
    if (!isInt && Math.ceil(num) > num) {
      return Math.floor(num) + 0.5;
    } else return num;
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

  const is_interested = () => {
    return deliveries
      ?.find((a) => a.bookID === notify?.bookID)
      ?.interestedUsersID?.includes(currentUser?._id);
  };
  // succeeded notify
  useEffect(() => {
    console.log(userNotifyAlready);
    addNote_status === "succeeded" && console.log(notify);
    // dispatch(addNotify(notify))
    // if (!userNotifyAlready)
    //   dispatch(addNotify(notify))
    // (!userNotifyAlready) && dispatch(addNotify(notify))
  
      
  }, [addNote_status]);

  // user props update
  useEffect(() => {
    currentUser !== null && dispatch(getUsers());
  }, []);

  // get delivers
  useEffect(() => {
    dispatch(getDeliveries());
    return () => {
      dispatch(getUsers());
      dispatch(getDeliveries());
    };
  }, []);

  // render delivers on notify clicked
  useEffect(() => {
    dispatch(getUsers());
    dispatch(getDeliveries());
    // deliverControle()
    return () => {
      dispatch(getUsers());
    };
  }, [notifyClicked]);

  const notifyControl = async (notify) => {
    dispatch(getUsers());
    console.log(notify);

    // let isNotifyAlready = await users
    //   ?.find((item) => item._id === notify?.toUserId)
    //   .notifications.find(({ bookID, fromUserId }) => {
    //     return(
    //       bookID?._id === notify?.bookID && fromUserId?._id === notify?.fromUserId

    //     )
    //   });
    console.log(is_interested());
    !is_interested() && dispatch(addNotify(notify))&&toast.success("הודעה נשלחה למוסר");;
    setNotify(notify);
  };

  return (
    <div className="container d-flex align-items-center justify-content-center mt-5 pb-5">
      <div
        style={{
          width: innerWidthSize < 768 ? "auto" : "auto",
        }}
        className="row"
      >
        <div className="p-2 ">
          {srchBooks_status === "succeeded" &&
            srchRes?.length > 0 &&
            srchRes?.map((item, i) => {
              return (
                <div key={item._id}>
                  <div className="d-md-flex p-2 ">
                    {/* right */}
                    <div className="d-md-flex ">
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
                          onClick={(e) => rating(e)}
                          value={rating}
                          a11y={false}
                          isHalf={false}
                          edit={
                            currentUser?._id !== item.userID._id ? true : false
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
                          {item.description}
                        </p>
                        {/* favs */}
                        <div className="d-flex align-items-center justify-content-between">
                          <Tooltip
                            title="הוספה למועדפים"
                            placement="bottom-end"
                          >
                            <p
                              className="fs-5 mt-md-2"
                              style={{
                                cursor: "pointer",
                              }}
                            >
                              {/* &nbsp; */}
                              {/* <GrFavorite /> */}
                              {/* <MdOutlineFavorite /> */}
                            </p>
                          </Tooltip>
                          <br />
                          {/* 
                         {deliveries?.find(a => a.bookID === item._id)?.
                            interestedUsersID?.includes(currentUser?._id) ? "yes" : "not"} */}

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
                                let notify = {
                                  fromUserId: currentUser?._id,
                                  toUserId: item.userID._id,
                                  bookID: item._id,
                                };
                                dispatch(addInterestedID(item._id));
                                setNotifyClicked(!notifyClicked);
                                notifyControl(notify);
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
                          className="bg-light d-flex shadow-lg rounded-circle"
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
