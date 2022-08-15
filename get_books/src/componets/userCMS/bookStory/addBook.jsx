import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { isRejectedWithValue } from '@reduxjs/toolkit';
import { useNavigate } from 'react-router-dom';
import { addBook, addBookStatus, books, booksS } from '../../../shared/redux/features/bookSlice';
import { categories, getCat } from '../../../shared/redux/features/categoriesSlice';
import { doApiMethod } from '../../../shared/services/apiService';
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify"
import { createDelivery } from '../../../shared/redux/features/deliverySlice';
import { getCurrentUser } from '../../../shared/redux/features/usersSlice';



export default function AddBook() {
  const nav = useNavigate();
  let { register, getValues, handleSubmit, formState: { errors } } = useForm();
  const dispatch = useDispatch();
  const getCategories = useSelector(categories)
  const getStatus = useSelector(addBookStatus)
  const { error, bookJustLoaded } = useSelector(booksS)
  const [isPublish, setIsPublish] = useState(true)
  const [clicked, setClicked] = useState(false)
  const user_id = useSelector(getCurrentUser)?._id

  // get category list
  useEffect(() => {
    user_id!=undefined&&dispatch(getCategories())
    user_id===undefined&&toast.info("נא התחבר")&&nav("/login")
  }, [])

  // create delivery
  useEffect(() => {
    return (() => {
      clicked&&dispatch(createDelivery({
        ownerID: bookJustLoaded.userID,
        bookID: bookJustLoaded._id,
      }))
    })
  }, [bookJustLoaded])

  // navigate forword
  useEffect(() => {
    clicked&&error?.message && toast.error(error?.message)

    if (getStatus === "succeeded" && !error && clicked) {
      console.log(getStatus);
      toast.success("הספר הועלה בהצלחה")
      nav("/")
    }

  }, [error, getStatus])

  // submit form
  const onSub = async (_dataBody) => {
    setClicked(true)
    console.log(_dataBody)

    if (_dataBody.image[0])
      _dataBody.image = await uploadImg(_dataBody.image[0])

    delete _dataBody.deliver
    dispatch(addBook(_dataBody)).unwrap()

  }

  const uploadImg = async (image) => {
    {
      console.log(image);
      const formData = new FormData();
      formData.append("file", image)
      formData.append("upload_preset", "z0p2wq40");
      console.log(formData);
      let data = await axios.post(
        "https://api.cloudinary.com/v1_1/getbooks/image/upload",
        formData
      )
      let imgUrl = await data.data.secure_url;
      return imgUrl

    }
  }


  return (
    <div className='d-flex justify-content-md-center container col-md-6'>
      <div >

        <h1 className='display-5 mt-5 mb-4 fw-bolder text-danger text-md-center'>add book</h1>
        <form onSubmit={handleSubmit(onSub)} >

          <label>שם הספר:</label>
          <input {...register("name", { required: true, minLength: 2 })} type="text" className='form-control' />
          {errors.name && <small className='d-block text-danger'>
            Enter a valid name (min 2 chars)
          </small>}

          <label>מחבר:</label>
          <input {...register("author", { required: true, minLength: 2 })} type="text" className='form-control' />
          {errors.author && <small className='d-block text-danger'>
            Enter valid author
          </small>}

          <label>שנת הוצאה:</label>
          <input {...register("publishing_year", { required: true, minLength: 1, maxLength: 4 })} type="text" className='form-control' />
          {errors.publishing_year && <small className='d-block text-danger'>
            Enter valid publishing year
          </small>}

          <label>מספר עמודים:</label>
          <input {...register("pages", { required: true, minLength: 1, maxLength: 10000 })} type="number" className='form-control' />
          {errors.pages && <small className='d-block text-danger'>
            Enter valid pages
          </small>}
          <label>תאור:</label>
          <textarea {...register("description")} type="text" className='form-control' />
          {errors.description && <small className='d-block text-danger'>
            Enter valid pages
          </small>}

          <label>תמונה:</label>
          <input {...register("image")} type="file" className='form-control' />

          <label>קטגוריה:</label>
          <select  {...register("cat_id", { required: true })} type="select" className='select-control text-center fw-bolder w-100' >
            <option >בחר קטגוריה ..</option>
            {getCategories.map((item) => {
              return (
                <option key={item._id} value={item._id}>{item.category}</option>
              )
            })}
          </select>
          {errors.cat_id && <small className='d-block text-danger'>
            choose a category
          </small>}


          <div className='d-flex py-2'>
            <label >פרסם את הספר למסירה כעת</label>
            <input onClick={(e)=>setIsPublish(!isPublish)} {...register("deliver")} type="checkbox" checked={isPublish} className='ms-2 border mx-2' />
          </div>

          {
            getStatus === "loading" &&
            <button className='btn btn-info mt-3'>
              <div>
                <strong>Loading...</strong>
              </div>
              <div className="spinner-border ms-auto" role="status" aria-hidden="true"></div>
            </button>

          }
          {
            getStatus === "idle" &&
            <button

              className='btn btn-info mt-3'>

              הוסף

            </button>
          }
          {
            getStatus === "failed" &&
            <button className='btn btn-info mt-3'>

              הוסף

            </button>
          }
          {
            getStatus === "succeeded" &&
            <button className='btn btn-info mt-3'>

              הוסף

            </button>
          }


        </form>
      </div>
    </div>
  )
}