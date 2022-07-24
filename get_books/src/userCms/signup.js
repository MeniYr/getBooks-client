import React from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { API_URL, doApiMethod } from '../services/apiService';

export default function Signup() {
  const nav = useNavigate();
  let { register, getValues, handleSubmit, formState: { errors } } = useForm();

  const onSub = (_dataBody) => {
    delete _dataBody.password2;
    console.log(_dataBody);
    doApi(_dataBody);

  }

  const doApi = async (_dataBody) => {
    let url = API_URL + "/users/signUp";
    try {
      let resp = await doApiMethod(url, "POST", _dataBody);
      if (resp.data.user._id) {
        toast.success("You sign up succefuly , now log in");
        nav("/login");
      }
      else {
        console.log(resp.data.user._id)
        toast.error("There is problem come back later");

      }
    }
    catch (err) {
      // .response -> שגיאות של אקסיוס מגיעות עם ריספונד
      console.log(err.response)
      if (err.response.data.code === 11000) {
        toast.error("Email already in system , try login or enter another email")
      }
      else {
        toast.error("There is problem come back later");

      }
    }
  }

  return (
    <div className='container'>
      <h1 className='display-5'>Sign up as new user:</h1>
      <form onSubmit={handleSubmit(onSub)} className='col-md-6'>
        <label>Name:</label>
        <input {...register("name", { required: true, minLength: 2 })} type="text" className='form-control' />
        {errors.name && <small className='d-block text-danger'>
          Enter valid name (min 2 chars)
        </small>}
        <label>Email:</label>
        <input {...register("email", { required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i })} type="email" className='form-control' />
        {errors.email && <small className='d-block text-danger'>
          Enter valid Email
        </small>}
        <label>password:</label>
        <input {...register("password", { required: true, minLength: 3 })} type="password" className='form-control' />
        {errors.password && <small className='d-block text-danger'>
          Enter valid password (min 3 chars)
        </small>}
        <label>Enter password again:</label>
        <input {...register("password2", {
          required: true, validate: (value) => {
            return value === getValues("password")
          }
        })} type="password2" className='form-control' />
        {errors.password2 && <small className='d-block text-danger'>
          Password not match
        </small>}
        <label>phone:</label>
        <input {...register("phone", { required: true, minLength: 9 })} type="phone" className='form-control' />
        {errors.phone && <small className='d-block text-danger'>
          Enter valid phone (min 9 chars)
        </small>}
        <button className='btn btn-info mt-3'>Sign up</button>
      </form>
    </div>
  )
}
