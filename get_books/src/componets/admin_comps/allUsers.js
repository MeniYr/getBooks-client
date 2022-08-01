import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import UserItem from '../../componets/userCMS/userStorey/userItem'
import { AuthWithToken } from '../../shared/redux/features/tokenSlice'
import { addUser, delUser, getUserByID, getUsers } from '../../shared/redux/features/usersSlice'


export default function AllUsers() {
  const dispatch = useDispatch()
  const getStatus = useSelector((state) => state.users.status)
  const getAuthStatus = useSelector((state) => state.token.authStatus)
  const token = useSelector((state) => state.token)
  const getEroor = useSelector((state) => state.users.error)
  const arr = useSelector((state) => state.users.users)
  const userID = useSelector((state) => state.token.id)

  const nav = useNavigate()
  console.log(getStatus)



  useEffect(() => {
    // if (getStatus === "idle")
    console.log(userID)
    if (token.token === null) {
      toast.info("please sign in")
      nav("/login")
    }
    console.log(token)
    console.log(getEroor)
    dispatch(AuthWithToken())

    console.log(getAuthStatus);
    console.log(getEroor);
    dispatch(getUsers())
  }, [])

  return (
    <div className='container'>
      <div className='row mx-auto col-md-6'>
        {getStatus === "succeeded" && arr.map(user => {
          return (
            <div key={user._id} className='d-flex justify-content-center '>

              <div>

                < UserItem item={user} />
              </div>
            </div>

          )
        })}
        {getStatus === "loading" && <h2>Loading..</h2>}
        {getStatus === "failed" && <h2>server problem pleace try again later ..</h2>}

      </div>
    </div>
  )
}
