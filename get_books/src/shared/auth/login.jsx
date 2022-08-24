import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
// import { ClientContext } from '../../context/clientContext';
import tokenSlice, { login, user_name } from "../redux/features/tokenSlice";
import { getUser } from "../redux/features/usersSlice";
import style from "./auth.module.css";

export default function Login() {
  // const {setUser,doApiUserInfo} = useContext(ClientContext)
  const dispatch = useDispatch();
  const logIn_status = useSelector((state) => state.token.logINStatus);
  const error = useSelector((state) => state.token.error);
  const userName = useSelector(user_name);
  const [clicked, setCilcked] = useState(false);
  const [closeBtn, setCloseBtn] = useState(true);
  const nav = useNavigate();

  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    clicked && logIn_status === "failed" && toast.error("email or user wrong");
    console.log(logIn_status);
  }, [error, logIn_status]);

  // useEffect(()=>{
  //   console.log();
  //   return (()=>{
  //     console.log(logIn_status);
  //     setCloseBtn(true)
  //     logIn_status==="succeeded"&&dispatch(getUser())

  //   }
  //   )
  // },[logIn_status])

  useEffect(() => {
    if (userName != "" && clicked) toast.success(`ברוך הבא ${userName}`);
  }, [userName, clicked]);

  useEffect(() => {
    return () => {
      clicked && dispatch(getUser());
    };
  }, [clicked]);

  useEffect(() => {
    logIn_status === "succeeded" &&
      clicked &&
      toast.success(`ברוך הבא ${userName}`) &&
      nav(-1);
    !closeBtn && nav("/");
  }, [closeBtn, logIn_status]);

  const onSub = (_dataBody) => {
    dispatch(login(_dataBody));
    setCilcked(true);
    setCloseBtn(false);
    logIn_status === "succeeded" && dispatch(getUser());
  };

  return (
    <div className={`modal ${closeBtn ? "d-block" : "none"} ${style.modal}`}>
      <div className={`modal-dialog  mt-5`}>
        <div className="modal-content">
          <button
            onClick={() => setCloseBtn(false)}
            className="p-3 btn btn-close"
          ></button>

          <div className="modal-header">
            <h1 className="display-5 text-center mx-auto">התחברות</h1>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit(onSub)} className="w-100 mx-auto">
              <label> אימייל</label>
              <input
                autoComplete="username"
                {...register("email", {
                  required: true,
                  pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                })}
                type="email"
                className="form-control"
              />
              {errors.email && (
                <small className="d-block text-danger">Enter valid Email</small>
              )}
              <label>סיסמא</label>
              <input
                autoComplete="current-password"
                {...register("password", { required: true, minLength: 3 })}
                type="password"
                className="form-control"
              />
              {errors.password && (
                <small className="d-block text-danger">
                  Enter valid password (min 3 chars)
                </small>
              )}

              <button data-bs-dismiss="modal" className="btn btn-success mt-3">
                התחבר
              </button>
            </form>
          </div>

          <div className="modal-footer">
            <div className="text-center mx-auto">
              <p>לא רשום?</p>
              <Link className="btn btn-outline-primary" to={"/signUp"}>
                הירשם
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
