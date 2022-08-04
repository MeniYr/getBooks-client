import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { isRejectedWithValue } from '@reduxjs/toolkit';
import { useNavigate } from 'react-router-dom';
import { addBook, bookStatus } from '../../../shared/redux/features/bookSlice';
import { categories, getCat } from '../../../shared/redux/features/categoriesSlice';
import { doApiMethod } from '../../../shared/services/apiService';
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify"




export default function AddBook() {
  const nav = useNavigate();
  let { register, getValues, handleSubmit, formState: { errors } } = useForm();
  const dispatch = useDispatch();
  const getCategories = useSelector(categories)
  const getStatus = useSelector(bookStatus)


  // const getUsers = useSelector((state) => state.users.users)

  useEffect(() => {
    dispatch(getCat())

  }, [])


  //   useEffect(() => {

  //   }
  // }, [getStatus])

  const onSub = async (_dataBody) => {

    console.log(_dataBody)

    //TODO  create delivery if the check box - to deliver in anather time - is false, plus delete the property of checkbox
    delete _dataBody.deliver

    if (_dataBody.image[0])
      _dataBody.image = await uploadImg(_dataBody.image[0])

    dispatch(addBook(_dataBody)).unwrap()
    if (getStatus === "succeeded") {
      toast.success("הספר הועלה בהצלחה")
      nav("/")
    }
    if (getStatus === "failed") {
      toast.error("נסה שנית")
    }

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
          <select  {...register("cat_id")} type="select" className='select-control text-center fw-bolder w-100' >
            <option selected >בחר קטגוריה ..</option>
            {getCategories.map((item) => {
              return (
                <option value={item._id}>{item.category}</option>
              )
            })}
          </select>



          <div className='d-flex py-2'>
            <label >פרסם את הספר למסירה כעת</label>
            <input {...register("deliver")} type="checkbox" className='ms-2 border mx-2' />
          </div>

          <button className='btn btn-info mt-3'>שמור</button>
        </form>
      </div>
    </div>
  )
}