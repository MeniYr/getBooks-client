import React, { useEffect } from "react";
import { useState } from "react";
import { MdAnimation } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom"

import moment from "moment";

import { addNotify, getUsersSlice } from "../redux/features/usersSlice";
import SendMsg from "../../componets/userCMS/userStorey/sendMsg";
import { getAllBooks, getAllMyBooks, getBooks, swichHide } from "../redux/features/bookSlice";
import { changeUserToDeliver, delivery } from "../redux/features/deliverySlice";
import { myStore } from "../redux/globalStore/store";
import BooksOnDeliver from "../../componets/booksOnDeliver";

export default function Delivery({ toOpenModal, note }) {
  const [openMsg, setOpenMsg] = useState(false);
  const [deliverClicked, setDliverClicked] = useState(false);
  const [notify, setNotify] = useState({});
  const { addNote_status, currentUser, userNotifyAlready, users } =
    useSelector(getUsersSlice);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllMyBooks());
  }, [deliverClicked]);
  
  useEffect(() => {
    notify?.bookID && onDeliverClick();
  }, [notify]);


  const onDeliverClick = () => {
    console.log(notify.bookID);
    console.log(notify.toUserId);
    let userToDeliver = {
      idBook: notify?.bookID,
      idUser: notify?.toUserId,
    };
    dispatch(changeUserToDeliver(userToDeliver));
    dispatch(addNotify(notify));
    dispatch(swichHide(note?.bookID._id));
    toOpenModal(false);
  };

  return (
    <div>
      {note.fromUserId._id !== note.bookID.userID && note?.isForDeliver!==true && (
        <div className={`modal  d-block`} tabIndex="-1">
          <div className="modal-dialog ">
            <div className="modal-content d-flex justify-content-center">
              <button
                onClick={() => toOpenModal(false)}
                type="button"
                className="btn-close me-auto ps-2 pt-2"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
              <div className="modal-header mx-auto">
                <h5 className="modal-title">
                  מסירת ספר -{" "}
                  <Link
                    onClick={() => toOpenModal(false)}
                    className="text-decoration-none navbar-text"
                    to={`/fullBook/${note.bookID._id}`}
                  >
                    {note.bookID.name}
                  </Link>
                </h5>
              </div>
              <div className="modal-body ">
                <div className=" d-md-flex p-2 ">
                  <div className="p-2 ">
                    <img
                      src={note.bookID.image}
                      className="shadow rounded-1"
                      alt="book pic"
                      width={109}
                      height={171}
                    />
                  </div>
                  <div className="text-wrap p-2">
                    {note.bookID.description.length > 200
                      ? note.bookID.description.substring(0, 200) + "..."
                      : note.bookID.description}
                  </div>
                </div>
                <hr />

                <button
                  className="fs-7 d-flex align-items-center border-0 badge text-primary"
                  onClick={() => {
                    setOpenMsg(true);
                  }}
                >
                  שלח הודעה
                </button>
                <p className="fs-4 text-decoration-underline text-center">
                  פרטי המעוניין
                </p>
                <div className="d-md-flex justify-content-between">
                  <p className="fs-4 pt-3 px-2">שם: {note.fromUserId.name}</p>
                  <p className="fs-4 pt-3  ">עיר: {note.fromUserId.city}</p>
                </div>
                <div className="d-md-grid ">
                  <div>
                    {openMsg && (
                      <SendMsg msgClose={setOpenMsg} id={note.fromUserId._id} />
                    )}
                  </div>
                  {note.fromUserId.isSharePhone === true && (
                    <div className="px-2">
                      <p className="fs-4">
                        {" "}
                        מספר ליצירת קשר: <a href={`tel:${note.fromUserId.phone}`}>{note.fromUserId.phone}</a> 
                      </p>
                    </div>
                  )}
                  {note.fromUserId.isShareMail === true && (
                    <div className="px-2 text-end">
                      <p className="fs-4">
                        {" "}
                        כתובת אימייל:{" "}
                        <a href={`mailto:${note.fromUserId.email}`}>
                          {note.fromUserId.email}
                        </a>
                      </p>
                    </div>
                  )}
                </div>
              </div>
              <div className="modal-footer d-flex justify-content-between">
                {/* <button onClick={() => toOpenModal(false)} type="button" class="btn btn-secondary" data-bs-dismiss="modal">סגור</button> */}
                <p>{moment(note.date).format("DD-MM-YYYY, HH:mm")}</p>
                <button
                  onClick={() => {
                    let notifyObj = {
                      fromUserId: currentUser?._id,
                      toUserId: note.fromUserId._id,
                      bookID: note.bookID._id,
                      isForDeliver:true
                    };
                    console.log(notifyObj);
                    setNotify(notifyObj);
                    // onDeliverClick();

                    setDliverClicked(!deliverClicked);
                    // 
                  }}
                  type="button"
                  className="btn btn-primary"
                >
                  מסור
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/*
       {note.secondary===true&&


<div className={`modal  d-block`} tabIndex="-1">
          <div className="modal-dialog ">
            <div className="modal-content d-flex justify-content-center">
              <button
                onClick={() => toOpenModal(false)}
                type="button"
                className="btn-close me-auto ps-2 pt-2"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
              <div className="modal-header mx-auto">
                <h5 className="modal-title">
                  קבלת ספר סופית -{" "}
                  <Link
                    onClick={() => toOpenModal(false)}
                    className="text-decoration-none navbar-text"
                    to={`/fullBook/${note.bookID._id}`}
                  >
                    {note.bookID.name}
                  </Link>
                </h5>
              </div>
              <div className="modal-body ">
                <div className=" d-md-flex p-2 ">
                  <div className="p-2 ">
                    <img
                      src={note.bookID.image}
                      className="shadow rounded-1"
                      alt="book pic"
                      width={109}
                      height={171}
                    />
                  </div>
                  <div className="text-wrap p-2">
                    {note.bookID.description.length > 200
                      ? note.bookID.description.substring(0, 200) + "..."
                      : note.bookID.description}
                  </div>
                </div>
                <hr />

                <button
                  className="fs-7 d-flex align-items-center border-0 badge text-primary"
                  onClick={() => {
                    setOpenMsg(true);
                  }}
                >
                  שלח הודעה
                </button>
                <p className="fs-4 text-decoration-underline text-center">
                  פרטי המוסר
                </p>
                <div className="d-md-flex justify-content-between">
                  <p className="fs-4 pt-3 px-2">שם: {note.fromUserId.name}</p>
                  <p className="fs-4 pt-3  ">עיר: {note.fromUserId.city}</p>
                </div>
                <div className="d-md-flex  text-wrap ">
                  <div>
                    {openMsg && (
                      <SendMsg msgClose={setOpenMsg} id={note.fromUserId._id} />
                    )}
                  </div>
                  {note.fromUserId.isSharePhone === true && (
                    <div className="px-2">
                      <p className="fs-4">
                        {" "}
                        מספר ליצירת קשר: {note.fromUserId.phone}
                      </p>
                    </div>
                  )}
                  {note.fromUserId.isShareMail === true && (
                    <div className="px-2">
                      <p className="fs-4">
                        {" "}
                        כתובת אימייל:{" "}
                        <a href={`mailto:${note.fromUserId.email}`}>
                          {note.fromUserId.email}
                        </a>
                      </p>
                    </div>
                  )}
                </div>
              </div>
              <div className="modal-footer d-flex justify-content-between">
                 <button onClick={() => toOpenModal(false)} type="button" class="btn btn-secondary" data-bs-dismiss="modal">סגור</button> 
                <p>{moment(note.date).format("DD-MM-YYYY, HH:mm")}</p>
                <button
                  onClick={() => {
                    toOpenModal(false);
                  }}
                  type="button"
                  className="btn btn-primary"
                >
                  סגור
                </button>
              </div>
            </div>
          </div>
        </div>

      }
     */}
      {note.fromUserId._id === note.bookID.userID && (
        <div className={`modal  d-block`} tabIndex="-1">
          <div className="modal-dialog ">
            <div className="modal-content d-flex justify-content-center">
              <button
                onClick={() => toOpenModal(false)}
                type="button"
                className="btn-close me-auto ps-2 pt-2"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
              <div className="modal-header mx-auto">
                <h5 className="modal-title">
                  קבלת ספר -{" "}
                  <Link
                    onClick={() => toOpenModal(false)}
                    className="text-decoration-none navbar-text"
                    to={`/fullBook/${note.bookID._id}`}
                  >
                    {note.bookID.name}
                  </Link>
                </h5>
              </div>
              <div className="modal-body ">
                <div className=" d-md-flex p-2 ">
                  <div className="p-2 ">
                    <img
                      src={note.bookID.image}
                      className="shadow rounded-1"
                      alt="book pic"
                      width={109}
                      height={171}
                    />
                  </div>
                  <div className="text-wrap p-2">
                    {note.bookID.description.length > 200
                      ? note.bookID.description.substring(0, 200) + "..."
                      : note.bookID.description}
                  </div>
                </div>
                <hr />

                <button
                  className="fs-7 d-flex align-items-center border-0 badge text-primary"
                  onClick={() => {
                    setOpenMsg(true);
                  }}
                >
                  שלח הודעה
                </button>
                <p className="fs-4 text-decoration-underline text-center">
                  פרטי המוסר
                </p>
                <div className="d-md-flex justify-content-between">
                  <p className="fs-4 pt-3 px-2">שם: {note.fromUserId.name}</p>
                  <p className="fs-4 pt-3  ">עיר: {note.fromUserId.city}</p>
                </div>
                <div className="d-md-flex  text-wrap ">
                  <div>
                    {openMsg && (
                      <SendMsg msgClose={setOpenMsg} id={note.fromUserId._id} />
                    )}
                  </div>
                  {note.fromUserId.isSharePhone === true && (
                    <div className="px-2">
                      <p className="fs-4">
                        {" "}
                        מספר ליצירת קשר: {note.fromUserId.phone}
                      </p>
                    </div>
                  )}
                  {note.fromUserId.isShareMail === true && (
                    <div className="px-2">
                      <p className="fs-4">
                        {" "}
                        כתובת אימייל:{" "}
                        <a href={`mailto:${note.fromUserId.email}`}>
                          {note.fromUserId.email}
                        </a>
                      </p>
                    </div>
                  )}
                </div>
              </div>
              <div className="modal-footer d-flex justify-content-between">
                {/* <button onClick={() => toOpenModal(false)} type="button" class="btn btn-secondary" data-bs-dismiss="modal">סגור</button> */}
                <p>{moment(note.date).format("DD-MM-YYYY, HH:mm")}</p>
                <button
                  onClick={() => {
                    toOpenModal(false);
                  }}
                  type="button"
                  className="btn btn-primary"
                >
                  סגור
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
