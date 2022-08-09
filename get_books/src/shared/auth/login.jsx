import React, { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
// import { ClientContext } from '../../context/clientContext';
import tokenSlice, { login, user_name } from "../redux/features/tokenSlice"
import { getUser } from '../redux/features/usersSlice';
export default function Login() {
  // const {setUser,doApiUserInfo} = useContext(ClientContext)
  const dispatch = useDispatch()
  const status = useSelector((state) => state.token.logINStatus)
  const error = useSelector((state) => state.token.error)
  const userName = useSelector(user_name)
  const [clicked, setCilcked] = useState(false)
  const nav = useNavigate();

  let { register, handleSubmit, formState: { errors } } = useForm();

  useEffect(() => {
    status === "failed" && toast.error("email or user wrong")
  }, [error])

  useEffect(() => {
    if (userName != "" && clicked)
      toast.success(`Welcome ${userName}, You logged in`)
  }, [userName])

  useEffect(() => {
    status === "succeeded" && clicked && nav("/")
    dispatch(getUser())
  }, [clicked, status])

  useEffect(() => {
    dispatch(getUser())
  }, [])



  const onSub = (_dataBody) => {

    dispatch(login(_dataBody))
    setCilcked(true)
  }

  return (
    <div className='container mt-5'>
      <h1 className='display-5 text-center'>התחברות</h1>
      <form onSubmit={handleSubmit(onSub)} className='col-md-6 mx-auto'>

        <label> Email</label>
        <input autoComplete='username' {...register("email", { required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i })} type="email" className='form-control' />
        {errors.email && <small className='d-block text-danger'>
          Enter valid Email
        </small>}
        <label>password</label>
        <input autoComplete='current-password' {...register("password", { required: true, minLength: 3 })} type="password" className='form-control' />
        {errors.password && <small className='d-block text-danger'>
          Enter valid password (min 3 chars)
        </small>}

        <button className='btn btn-success mt-3'>Log in</button>
      </form>

      <div className='text-center'>
        <p>לא רשום?</p>
        <Link className='btn btn-outline-primary' to={"/signUp"}>הירשם</Link>
      </div>
    </div>
  )
}
