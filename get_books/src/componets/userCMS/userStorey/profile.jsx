import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { AuthWithToken, user_from_token } from '../../../shared/redux/features/tokenSlice'
import { getCurrentUser, getUser } from '../../../shared/redux/features/usersSlice'
import UserItem from './userItem'


export default function Profile() {

    const dispatch = useDispatch()
    const user = useSelector(getCurrentUser)
    const checkErrorAuth = useSelector(user_from_token).error
    const nav = useNavigate()

    useEffect(() => {
        dispatch(AuthWithToken())

        if (checkErrorAuth != null) {
            toast.warning("please log in")
            nav("/login")
        }

    }, [checkErrorAuth])
    return (
        <div className='container d-flex justify-content-center text-center'>
            {user != null && <UserItem item={user} />}

        </div>
    )
}
