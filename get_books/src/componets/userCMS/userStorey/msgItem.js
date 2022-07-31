import moment from 'moment'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { allUsers, getUser, getUserByID } from '../../../shared/redux/features/usersSlice'

export default function MsgItem(props) {
  const dispatch =  useDispatch()
  // const users = useSelector(allUsers)
  const msg = props.item



  return (
    <div key={msg._id} className=''>
      <div className='row'>

        <div>נשלח: {moment(msg.date).format('DD-MM-YYYY, HH:mm')}</div>

      </div>

    </div>
  )
}
