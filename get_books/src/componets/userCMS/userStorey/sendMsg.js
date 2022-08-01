import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { getUserByID, getUsersSlice } from '../../../shared/redux/features/usersSlice'

export default function SendMsg(props) {
    const dispatch = useDispatch()
    const toUser = useSelector(getUsersSlice).userByID
    const params = useParams()
    const toUserId = params.userId

    useEffect(() => {
        console.log(toUserId);
        dispatch(getUserByID(toUserId))
        setTimeout(() => {

            console.log(toUser);
            if (toUser.error)
                toast.error("there is no from property")
        }, 1000);
    }, [])

    return (
        <div className='mt-md-5 container '>
            <div className='border p-2 col-md-6 mx-auto d-block'>
            <p>שם משתמש: {toUser.name}</p>
            <label>תוכן הודעה:</label>
            <textarea className='w-100'></textarea>

            </div>
            
        </div>
    )
}
