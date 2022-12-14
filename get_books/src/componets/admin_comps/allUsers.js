import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import UserItem from '../../componets/userCMS/userStorey/userItem'
import { AuthWithToken } from '../../shared/redux/features/tokenSlice'
import { addUser, delUser, getCurrentUser, getUser, getUserByID, getUsers } from '../../shared/redux/features/usersSlice'


export default function AllUsers() {
  const dispatch = useDispatch()
  const nav = useNavigate()
  const getStatus = useSelector((state) => state.users.status)
  const getAuthStatus = useSelector((state) => state.token.authStatus)
  const token = useSelector((state) => state.token)
  const getEroor = useSelector((state) => state.users.error)
  const arr = useSelector((state) => state.users.users)
  const userID = useSelector((state) => state.token.id)

  //TODO token save on login plus admin check 

  useEffect(() => {

    if (token.token === null) {
      toast.info("נא התחבר")
      nav("/login")
    }
    else {
      dispatch(AuthWithToken())
      dispatch(getUsers())
      dispatch(getUser())
    }

  }, [])

  return (
    <div className='container'>
      <div className='row'>
        {getStatus === "succeeded" && arr.map((user, i) => {
          return (
            <div key={user._id} >
              <div >
                < UserItem item={user} />
                {i !== arr.length - 1 && <hr />}
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
