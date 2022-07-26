import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUsers } from '../features/usersSlice'


export default function AllUsers() {
  const dispatch = useDispatch()

  const arr = useSelector((state) => state.users.users)
  useEffect(() => {

    dispatch(getUsers())
    if (arr.length > 1)
      console.log(arr)
  }, [])

  return (
    <div className='container'>
      <div className='row'>
        {useSelector((state) => state.users.status) === "succeeded" && arr.map(user => {
          return (
            <div key={user._id} className='border'>
              <h2>{user.name}</h2>
            </div>
          )
        })}

      </div>
    </div>
  )
}
