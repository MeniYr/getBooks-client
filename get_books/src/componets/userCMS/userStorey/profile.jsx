import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { AuthWithToken, user_from_token } from '../../../shared/redux/features/tokenSlice'
import { getCurrentUser, getUser, getUsersSlice } from '../../../shared/redux/features/usersSlice'
import UserItem from './userItem'


export default function Profile() {

    const dispatch = useDispatch()
    // const user = useSelector(getCurrentUser)
    const {currentUser} = useSelector(getUsersSlice)
    const nav = useNavigate()

    useEffect(() => {
        dispatch(AuthWithToken())

        if (!currentUser) {
            toast.warning("please log in")
            nav("/login")
        }

    }, [currentUser])
    return (
        <div className='container d-flex justify-content-center text-center'>
            {currentUser && <UserItem item={currentUser} />}

        </div>
    )
}
