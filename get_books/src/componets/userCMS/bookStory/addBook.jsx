import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { isRejectedWithValue } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";
import {
  addBook,
  addBookStatus,
  books,
  booksS,
} from "../../../shared/redux/features/bookSlice";
import { doApiGet, doApiMethod } from "../../../shared/services/apiService";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";
import {
  createDelivery,
  delivery,
} from "../../../shared/redux/features/deliverySlice";
import {
  getCurrentUser,
  getUser,
} from "../../../shared/redux/features/usersSlice";
import { CircularProgress } from "@mui/material";
import { CAT } from "../../../shared/constants/globalinfo/URL`S";
import { useRef } from "react";

export default function AddBook() {
  const nav = useNavigate();
  let {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const { error, bookJustLoaded, addBook_status } = useSelector(booksS);
  const user_id = useSelector(getCurrentUser);

  const [clicked, setClicked] = useState(false);
  const [loadingImg, setLoadingImg] = useState(false);
  const [cat, setCat] = useState([]);
const addCatRef = useRef()
  // get category list
  const onEntering = async () => {
 
    if(user_id?._id.length> 0)
    try {
      let data = await (await doApiGet(CAT)).data
      console.log(data)
      setCat(data)
  }
  catch (err) {
    console.log(err);
      throw err?.response?.data[0]?.message
  }
   
  };

  const addCat = async() =>{
    try {
      let data = await (await doApiMethod(`${CAT}/add`, "POST", addCatRef)).data
      console.log(data)
     onEntering()
  }
  catch (err) {
    console.log(err);
      throw err?.response?.data[0]?.message
  }
  }

  useEffect(() => {
    onEntering();
    // console.log(saveOnRefresh);
  }, []);

  useEffect(() => {
    if (window.location.reload) !user_id?._id && nav(-1);
    else !user_id?._id && toast.info("נא התחבר") && nav("login");
  }, [window.location.reload, user_id]);

  // create delivery
  useEffect(() => {
    console.log(addBook_status);
    return () => {
      clicked &&
        dispatch(
          createDelivery({
            ownerID: bookJustLoaded.userID,
            bookID: bookJustLoaded._id,
          })
        );
    };
  }, [bookJustLoaded]);

  // navigate forword
  useEffect(() => {
    clicked && error?.message && toast.error(error?.message);

    if (addBook_status === "succeeded" && !error && clicked) {
      console.log(addBook_status);
      toast.success("הספר הועלה בהצלחה");
      nav("/");
    }
  }, [error, addBook_status]);

  // submit form
  const onSub = async (_dataBody) => {
    console.log(_dataBody);
    
    if (_dataBody.image[0])
    _dataBody.image = await uploadImg(_dataBody.image[0]);
    
    setClicked(true);
    delete _dataBody.deliver;
    dispatch(addBook(_dataBody));
  };

  const uploadImg = async (image) => {
    setLoadingImg(true);
    {
      console.log(image);
      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", "z0p2wq40");
      console.log(formData);
      let data = await axios.post(
        "https://api.cloudinary.com/v1_1/getbooks/image/upload",
        formData
      );
      let imgUrl = await data.data.secure_url;
      return imgUrl;
    }
    setLoadingImg(false);
  };

  return (
    <div className="d-flex justify-content-md-center container col-md-8 pb-3">
      <div>
        <h1 className="display-5 mt-5 mb-4 fw-bolder text-danger text-md-center">
          add book
        </h1>
        <form onSubmit={handleSubmit(onSub)}>
          <label>שם הספר:</label>
          <input
            {...register("name", { required: true, minLength: 2 })}
            type="text"
            className="form-control"
          />
          {errors.name && (
            <small className="d-block text-danger">
              Enter a valid name (min 2 chars)
            </small>
          )}

          <label>מחבר:</label>
          <input
            {...register("author", { required: true, minLength: 2 })}
            type="text"
            className="form-control"
          />
          {errors.author && (
            <small className="d-block text-danger">Enter valid author</small>
          )}

          <label>שנת הוצאה:</label>
          <input
            {...register("publishing_year", { maxLength: 4 })}
            type="text"
            className="form-control"
          />
          {errors.publishing_year && (
            <small className="d-block text-danger">
              Enter valid publishing year
            </small>
          )}

          <label>מספר עמודים:</label>
          <input
            {...register("pages", {
              required: true,
              minLength: 1,
              maxLength: 10000,
            })}
            type="number"
            className="form-control"
          />
          {errors.pages && (
            <small className="d-block text-danger">Enter valid pages</small>
          )}
          <label>תקציר:</label>
          <textarea
            {...register("description")}
            type="text"
            className="form-control"
          />
          {errors.description && (
            <small className="d-block text-danger">Enter valid pages</small>
          )}

          <label>תמונה:</label>
          <input {...register("image")} type="file" className="form-control" />

          <label>קטגוריה:</label>
          <select
            {...register("cat_id", { required: true })}
            type="select"
            className="select-control text-center fw-bolder w-100"
          >
            <option>בחר קטגוריה ..</option>
            {cat?.map((item) => {
              return (
                <option key={item._id} value={item._id}>
                  {item.category}
                </option>
              );
            })}
          </select>
          {errors.cat_id && (
            <small className="d-block text-danger">choose a category</small>
          )}


          {loadingImg || addBook_status === "loading" ? (
            <button className="btn btn-info mt-3">
              <div>
                <CircularProgress></CircularProgress>
                {/* <strong>Loading...</strong> */}
              </div>
            </button>
          ) : (
            <button className="btn btn-info mt-3">הוסף</button>
          )}
        </form>
         {user_id?.role==="admin"&& <div className='d-flex py-2'>
            <label >הוסף קטגוריה</label>
            <input ref={addCatRef} className='ms-2 border mx-2' />
            <button onClick={addCat}>הוסף</button>
          </div>}
      </div>
    </div>
  );
}
