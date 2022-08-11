import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { addUser } from '../../shared/redux/features/usersSlice';

import style from "./auth.module.css"


export default function Signup() {
  const nav = useNavigate();
  let { register, getValues, handleSubmit, formState: { errors } } = useForm();
  const dispatch = useDispatch();
  const getStatus = useSelector((state) => state.users.signUp_status)
  const getEroor = useSelector((state) => state.users)
  // const getUsers = useSelector((state) => state.users.users)

  useEffect(() => {
    if (getStatus === "succeeded") {
      toast.success("signup succsesfully, please sign in")
      nav("/login")
    }
    if (getStatus === "failed") {
      toast.error("signup failed, please try again")
    }

  }, [getStatus])

  const onSub = async (_dataBody) => {
    delete _dataBody.password2;
    await (await dispatch(addUser(_dataBody)).unwrap())
  }


  return (
    <div className='d-flex justify-content-center container col-md-6'>
      <div >

        <h1 className='display-5 mt-5 mb-4 fw-bolder text-danger text-md-center'>Sign up</h1>
        <form onSubmit={handleSubmit(onSub)} >

          <label>שם:</label>
          <input autoComplete='name' {...register("name", { required: true, minLength: 2 })} type="text" className='form-control' />
          {errors.name && <small className='d-block text-danger'>
            Enter a valid name (min 2 chars)
          </small>}

          <label>אימייל:</label>
          <input autoComplete='username' {...register("email", { required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i })} type="email" className='form-control' />
          {errors.email && <small className='d-block text-danger'>
            Enter valid Email
          </small>}

          <label>סיסמא:</label>
          <input autoComplete='new-password' {...register("password", { required: true, minLength: 3 })} type="password" className='form-control' />
          {errors.password && <small className='d-block text-danger'>
            Enter valid password (min 3 chars)
          </small>}

          <label>הכנס סיסמא שנית:</label>
          <input autoComplete='new-password' {...register("password2", {
            required: true, validate: (value) => {
              return value === getValues("password")
            }
          })} type="password" className='form-control' />
          {errors.password2 && <small className='d-block text-danger'>
            Password not match
          </small>}

          <label>פלאפון:</label>
          <input {...register("phone", { required: true, minLength: 7 })} type="phone" className='form-control' />
          {errors.phone && <small className='d-block text-danger'>
            Enter valid phone (min 7 chars)
          </small>}

          <label>עיר:</label>
          <input {...register("city", { required: true, minLength: 2 })} type="text" className='form-control' />
          {errors.address && <small className='d-block text-danger'>
            Enter a valid city (min 2 chars)
          </small>}

          <label>רחוב:</label>
          <input {...register("street", { required: true, minLength: 2 })} type="text" className='form-control' />
          {errors.address && <small className='d-block text-danger'>
            Enter a valid street (min 2 chars)
          </small>}

          <div className='d-flex py-2'>
            <label className='d-flex justify-content-md-center '>מסכים להציג את כתובת האימייל </label>
            <input {...register("isShareMail", { minLength: 2 })} type="checkbox" className='ms-2 border' />
          </div>

          <div className='d-flex py-2'>
            <label >מסכים להציג את מספר הפלאפון</label>
            <input {...register("isSharePhone", { minLength: 2 })} type="checkbox" className='ms-2 border' />
          </div>

          <button className='btn btn-info mt-3'>הירשם</button>
        </form>
      </div>
    </div>
  )
}
