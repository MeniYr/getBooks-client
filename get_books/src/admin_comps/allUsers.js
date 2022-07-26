import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import UserItem from '../comps/userStore/userItem'
import { getUsers } from '../features/usersSlice'


export default function AllUsers() {
  const dispatch = useDispatch()
  const getStatus = useSelector((state) => state.users.status)
  const arr = useSelector((state) => state.users.users)
  console.log(getStatus)
  useEffect(() => {
    if (getStatus === "idle")
      dispatch(getUsers())

  }, [])

  return (
    <div className='container'>
      <div className='row mx-auto col-md-6'>
        {getStatus === "succeeded" && arr.map(user => {
          return (
            < UserItem key item={user} />
          )
        })}

      </div>
    </div>
  )
}
