import { Button, Tooltip } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { books, booksS } from '../shared/redux/features/bookSlice';
import { createDelivery } from '../shared/redux/features/deliverySlice';
import { user_name } from '../shared/redux/features/tokenSlice';
import { logOut, logOutFromUsers, reset } from '../shared/redux/features/usersSlice';
import Modal from './modal';
import Delivery from './userCMS/delivery';


export default function Home() {
  const dispatch = useDispatch()
  const userName = useSelector(user_name)
  const { bookJustLoaded } = useSelector(booksS)
  const [isLoginMode, setIsLoginMode] = useState(true)
  const [openModal, setOpenModal] = useState(false)

  useEffect(() => {

  }, [])




  return (
    <div>
      home
      {/* <button onClick={() => { setOpenModal(true) }}>
        לחץ
      </button>
      {openModal && <Delivery toOpenModal={setOpenModal} />} */}
      {/* {toast.success(`Welcome ${userName}, You logged in`)} */}
    
    
    </div>
  )
}
