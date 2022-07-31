import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { allUsers, getUser, getUserByID } from '../../../shared/redux/features/usersSlice'
import UserItem from './userItem'

export default function MsgItem(props) {
  const dispatch = useDispatch()

  const msg = props.item



  return (
    <div key={msg._id} className=''>
      <div className='row'>
<Link>from</Link>
        <div>נשלח: {moment(msg.date).format('DD-MM-YYYY, HH:mm')}</div>
      </div>

    </div>
  )
}
