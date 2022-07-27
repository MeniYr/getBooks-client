import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import UserItem from '../comps/userStore/userItem'
import { AuthWithToken } from '../features/tokenSlice'
import { getUsers } from '../features/usersSlice'


export default function AllUsers() {
  const dispatch = useDispatch()
  const getStatus = useSelector((state) => state.users.status)
  const getEroor = useSelector((state) => state.users.error)
  const arr = useSelector((state) => state.users.users)
  console.log(getStatus)
  useEffect(() => {
    // if (getStatus === "idle")
    console.log(getStatus)
    dispatch(getUsers())
 
  }, [])

  return (
    <div className='container'>
      <div className='row mx-auto col-md-6'>
        {getStatus === "succeeded" && arr.map(user => {
          return (
            < UserItem item={user} />
          )
        })}
        {getStatus === "loading" && <h2>Loading..</h2>}
        {getStatus === "failed" && <h2>server problem pleace try again later ..</h2>}

      </div>
    </div>
  )
}
