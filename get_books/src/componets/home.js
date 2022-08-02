import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { user_name } from '../shared/redux/features/tokenSlice';


export default function Home() {
  // const dispatch = useDispatch()
  const userName = useSelector(user_name)
  const [isLoginMode, setIsLoginMode] = useState(true)

  useEffect(() => {

    console.log(userName)
    if (userName != "aaaa") {
      toast.success(`Welcome ${userName}, You logged in`)
    }

  }, [userName])

  console.log(userName)


  return (
    <div>
      home

      <div>
        {/* {toast.success(`Welcome ${userName}, You logged in`)} */}
      </div>
    </div>
  )
}
