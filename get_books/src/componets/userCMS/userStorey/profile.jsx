import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCurrentUser, getUser } from '../../../shared/redux/features/usersSlice'
import UserItem from './userItem'


export default function Profile() {
    
    const dispatch = useDispatch()
    const user = useSelector(getCurrentUser)

    return (
        <div className='container d-flex justify-content-center text-center'>
            {user != null && <UserItem item={user} />}

        </div>
    )
}
