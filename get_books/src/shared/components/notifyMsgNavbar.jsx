import React, { useEffect } from "react";
import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import moment from "moment";

import { getUsersSlice } from "../redux/features/usersSlice";
import SendMsg from "../../componets/userCMS/userStorey/sendMsg";
// import {
//   getAllBooks,
//   getAllMyBooks,
//   getBooks,
//   swichHide,
// } from "../redux/features/bookSlice";
// import { changeUserToDeliver, delivery } from "../redux/features/deliverySlice";
// import { myStore } from "../redux/globalStore/store";
// import BooksOnDeliver from "../../componets/booksOnDeliver";
// import { TextField } from "@mui/material";

export default function NotifyMsgNavbar({ msg, toOpenModal }) {
  const [openMsg, setOpenMsg] = useState(false);
  const [deliverClicked, setDliverClicked] = useState(false);
  const [notify, setNotify] = useState({});
  const { addNote_status, currentUser, userNotifyAlready, users } =
    useSelector(getUsersSlice);
  const dispatch = useDispatch();



  return (
    <div>
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
                מאת{" "}
                
                  {msg.fromUserId.name}
 

              </h5>
            </div>
            <div className="modal-body ">
              <div className=" d-md-flex p-2 ">
                <textarea className="form-control overflow-scroll">{msg.msg}</textarea>
              </div>
              <hr />

              <button
                className="fs-7 d-flex align-items-center border-0 badge text-primary"
                onClick={() => {
                  setOpenMsg(true);
                }}
              >
                הגב
              </button>
              <p className="fs-4 text-decoration-underline text-center">
                פרטי השולח
              </p>
              <div className="d-md-flex justify-content-between">
                <p className="fs-4 pt-3  ">עיר: {msg.fromUserId.city}</p>
              </div>
              <div className="d-md-grid ">
                <div>
                  {openMsg && (
                    <SendMsg msgClose={setOpenMsg} id={msg.fromUserId._id} />
                  )}
                </div>
                {msg.fromUserId.isSharePhone === true && (
                  <div className="px-2">
                    <p className="fs-4">
                      {" "}
                      מספר ליצירת קשר:{" "}
                      <a href={`tel:${msg.fromUserId.phone}`}>
                        {msg.fromUserId.phone}
                      </a>
                    </p>
                  </div>
                )}
                {msg.fromUserId.isShareMail === true && (
                  <div className="px-2 text-end">
                    <p className="fs-4">
                      {" "}
                      כתובת אימייל:{" "}
                      <a href={`mailto:${msg.fromUserId.email}`}>
                        {msg.fromUserId.email}
                      </a>
                    </p>
                  </div>
                )}
              </div>
            </div>

              <p>{moment(msg.date).format("DD-MM-YYYY, HH:mm")}</p>
            </div>
          </div>
        </div>
      </div>
 
  );
}
