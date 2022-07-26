import React from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { API_URL, doApiMethod } from '../../services/apiService';

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
      console.log(resp.data)
      if (resp.data._id) {
        toast.success("You sign up succefuly , now log in");
        nav("/login");
      }
      else {
        console.log(resp.data.user._id)
        toast.error("There is problem come back later", {
          className: "color:gray;"
        });
      }
    }

    catch (err) {
      if (err.response.data.code === 11000) {
        toast.error("Email already in system, try login or enter another email", {
          // className:"w-md-10"
        })
      }
      else {
        console.log(err)
        toast.error("There is problem come back later", {
          // className: "w-md-10"
        });
      }

    }
  }

  return (
    <div className='d-flex justify-content-md-center container col-md-6'>
      <div >

        <h1 className='display-5 mt-5 mb-4 fw-bolder text-danger text-md-center'>Sign up</h1>
        <form onSubmit={handleSubmit(onSub)} className=''>

          <label>Name:</label>
          <input {...register("name", { required: true, minLength: 2 })} type="text" className='form-control' />
          {errors.name && <small className='d-block text-danger'>
            Enter a valid name (min 2 chars)
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

          <label>address:</label>
          <input {...register("address", { required: true, minLength: 2 })} type="text" className='form-control' />
          {errors.address && <small className='d-block text-danger'>
            Enter a valid address (min 2 chars)
          </small>}

          <div className='d-flex py-2'>
            <label className='d-flex justify-content-md-center '>accept to share email with users </label>
            <input {...register("isShareMail", { minLength: 2 })} type="checkbox" className='ms-2 border' />
            {errors.isShareMail &&
              <small className='d-block text-danger'>
                Enter a valid address (min 2 chars)
              </small>}
          </div>

          <div className='d-flex py-2'>
            <label >accept to share phone with users</label>
            <input {...register("isSharePhone", { minLength: 2 })} type="checkbox" className='ms-2 border' />
            {errors.isSharePhone &&
              <small className='d-block text-danger'>
                Enter a valid address (min 2 chars)
              </small>}
          </div>

          <button className='btn btn-info mt-3'>Sign up</button>
        </form>
      </div>
    </div>
  )
}
