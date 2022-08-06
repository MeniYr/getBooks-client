import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { user_name } from '../shared/redux/features/tokenSlice';
import { logOut, logOutFromUsers, reset } from '../shared/redux/features/usersSlice';


export default function Home() {
  const dispatch = useDispatch()
  const userName = useSelector(user_name)
  const [isLoginMode, setIsLoginMode] = useState(true)

  useEffect(() => {

  }, [])




  return (
    <div>
      home

      <div>
        {/* {toast.success(`Welcome ${userName}, You logged in`)} */}
      </div>
    </div>
  )
}
