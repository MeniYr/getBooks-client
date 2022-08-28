import { Backdrop, backdropClasses } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  booksS,
  findBook,
  getBooks,
  sendBookMassage,
} from "../../../shared/redux/features/bookSlice";
import {
  getUser,
  getUserByID,
  getUsersSlice,
  sendMassage,
} from "../../../shared/redux/features/usersSlice";
import styles from "./userStore.module.css";

export default function SendMsg({ id, bookId, msgClose }) {
  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const toUser = useSelector(getUsersSlice)?.userByID;
  const user = useSelector(getUsersSlice)?.currentUser;
  const { msg_status } = useSelector(getUsersSlice);
  const { sendBookMassage_status } = useSelector(booksS);
  const nav = useNavigate();
  const params = useParams();
  const toUserId = params.userId;
  // const [closeMsgBtn, setCloseMsgBtn] = useState(true)

//   useEffect(() => {
    // return () => {
    //   dispatch(findBook(bookId || id));
    // };
//   }, [sendBookMassage_status, msg_status]);

  const onSub = (_dataBody) => {
    console.log(bookId);
    let msg = {
      fromUserId: user._id,
      toUserId: toUserId || bookId,
    };

    let bookMsg = {
      toBookID: bookId,
      fromUserId: id,
      msg: _dataBody.msg,
    };
    toUserId && dispatch(sendMassage(msg));

    bookId && dispatch(sendBookMassage(bookMsg));
    msgClose(false);
  };

  useEffect(() => {
    if (user === undefined) {
      toast.info("נא התחבר");
      nav("/login");
    }
    dispatch(getUserByID(toUserId || id));
    dispatch(getUser());
    if (toUser?.error) toast.error("נסה שנית");
  }, []);

  useEffect(() => {
    console.log(msg_status);
    // msg_status==="succeeded"&&nav(-1)
  }, [msg_status]);

  return (
    <div className={`modal d-flex align-items-center d-block`}>
      <div
        style={{
          width: "fit-content",
        }}
        className="modal-dialog"
      >
        <div className="modal-content">
          <button
            onClick={() => msgClose(false)}
            className="p-3 btn btn-close"
          ></button>
          <div className="modal-header">
            <h1 className="display-5 text-center mx-auto">שליחת הודעה</h1>
          </div>
          <div className="modal-body">
            <div className=" p-2  mx-auto d-block">
              <form onSubmit={handleSubmit(onSub)}>
                {toUserId && <p>למשתמש: {toUser.name}</p>}
                {bookId && <p>רשום כאן ביקורת על הספר:</p>}
                {toUserId && <label>תוכן ההודעה:</label>}
                <input
                  {...register("msg", { required: true })}
                  type="text"
                  className="w-100 form-control"
                />
                <div className="modal-footer">
                  <button className="btn btn-success mt-3">שלח</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
