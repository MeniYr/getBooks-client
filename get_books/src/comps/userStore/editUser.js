import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { API_URL, doApiGet, doApiMethod } from '../../services/apiService';
import { toast } from "react-toastify";

import ClientAuthComp from './clientAuthComp';


export default function EditUser() {
  const [user, setUser] = useState({});
  const [phoneChecked, setPhoneChecked] = useState(false);
  const [emailChecked, setEmailChecked] = useState(false);

  const params = useParams();
  const nav = useNavigate();

  let { register,getValues, handleSubmit, formState: { errors } } = useForm();

  useEffect(() => {
    doApiInit();
  }, [])

  const doApiInit = async () => {
    let url = API_URL + "/users/userInfo";

    try {
      let resp = await doApiGet(url);
      setUser(resp.data);
    }
    catch (err) {
      console.log(err);
      toast("There error try again later")
    }
  }

  const onSub = (_dataBody) => {
    console.log(_dataBody);
    doApiEdit(_dataBody);
  }

  const doApiEdit = async (_dataBody) => {
    let url = API_URL + "/users/editUserInfo";
    try {
      let resp = await doApiMethod(url, "PUT", _dataBody);
      console.log(resp.data)
      if (resp.data.modifiedCount == 1) {
        toast.success("user updated");
        // nav("/admin/usersList");
      }
    }
    catch (err) {
      console.log(err.response);
      toast.error("There error try again later")
    }

  }

  return (
    <div className='container'>
      <ClientAuthComp />
      <h1 className='mx-auto col-md-4'>Edit user</h1>
      {user.name ?
        <form onSubmit={handleSubmit(onSub)} className='col-md-6  mx-auto'>

          <label>Name:</label>
          <input defaultValue={user.name} {...register("name", { required: true, minLength: 2 })} type="text" className='form-control' />
          {errors.name && <small className='d-block text-danger'>
            Enter a valid name (min 2 chars)
          </small>}

          <label>Email:</label>
          <input  defaultValue={user.email}{...register("email", { required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i })} type="email" className='form-control' />
          {errors.email && <small className='d-block text-danger'>
            Enter valid Email
          </small>}

          <label>password:</label>
          <input {...register("password")} type="password" className='form-control' />
          {errors.password && <small className='d-block text-danger'>
            Enter valid password (min 3 chars)
          </small>}
          <label>Enter password again:</label>
          <input {...register("password2", {
             validate: (value) => {
              return value === getValues("password")
            }
          })} type="password2" className='form-control' />
          {errors.password2 && <small className='d-block text-danger'>
            Password not match
          </small>}

          <label> phone:</label>
          <input defaultValue={user.phone}{...register("phone", { required: true, minLength: 9 })} type="phone" className='form-control' />
          {errors.phone && <small className='d-block text-danger'>
            Enter valid phone (min 9 chars)
          </small>}

          <label>address:</label>
          <input defaultValue={user.address}{...register("address", { required: true, minLength: 2 })} type="text" className='form-control' />
          {errors.address && <small className='d-block text-danger'>
            Enter a valid address (min 2 chars)
          </small>}

          <div className='d-flex py-2'>
          
            <label className='d-flex justify-content-md-center '>accept to share email with users </label>
            <input  onInput={()=>setEmailChecked(!emailChecked)} defaultChecked={user.isShareMail} value={emailChecked} {...register("isShareMail", { minLength: 2 })} type="checkbox" className='ms-2 border' />
            {errors.isShareMail &&
              <small className='d-block text-danger'>
                Enter a valid address (min 2 chars)
              </small>}
          </div>

          <div className='d-flex py-2'>
            <label >accept to share phone with users</label>
            <input onInput={()=>setPhoneChecked(!phoneChecked)} defaultChecked={user.isSharePhone} value={phoneChecked} {...register("isSharePhone", { minLength: 2 })} type="checkbox" className='ms-2 border' />
            {errors.isSharePhone &&
              <small className='d-block text-danger'>
                Enter a valid address (min 2 chars)
              </small>}
          </div>

          <button className='btn btn-info mt-3'>save</button>
        </form>
        : <h2>Loading...</h2>}
    </div>
  )
}