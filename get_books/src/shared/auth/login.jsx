import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { REHYDRATE } from "redux-persist";
import { onLoading, onLogin, persist, re, reset } from "../..";
// import { ClientContext } from '../../context/clientContext';
import tokenSlice, {
  AuthWithToken,
  login,
  user_name,
} from "../redux/features/tokenSlice";
import { getUser } from "../redux/features/usersSlice";
import { TOKEN_NAME } from "../services/apiService";
import style from "./auth.module.css";

export default function Login() {
  // const {setUser,doApiUserInfo} = useContext(ClientContext)
  const dispatch = useDispatch();
  const { logINStatus, error, id, token } = useSelector((state) => state.token);
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
    clicked && logINStatus === "failed" && toast.error("email or user wrong");
    console.log(logINStatus);
  }, [error, logINStatus]);

  useEffect(() => {
    return () => {
      localStorage[TOKEN_NAME] && dispatch(getUser());
    };
  }, [clicked, closeBtn, logINStatus]);

  useEffect(() => {
    console.log(closeBtn, clicked, logINStatus);
    clicked && logINStatus === "succeeded" && setCloseBtn(false);
    if (!closeBtn) nav("/");
  }, [closeBtn, logINStatus]);

  const onSub = (_dataBody) => {
    dispatch(login(_dataBody));
    setCilcked(true);
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
                {...register("password", { required: true, minLength: 0 })}
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
