import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { user_name } from '../shared/redux/features/tokenSlice';

export default function Home() {
  const userName = useSelector(user_name)

useEffect(()=> {
  console.log(userName);
  toast.success(`Welcome ${userName}, You logged in`);

},[])


  return (
    <div>
      home
    </div>
  )
}
