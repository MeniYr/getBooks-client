import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { AuthWithToken, userID } from '../../../shared/redux/features/tokenSlice'
import { allUsers, getUser, getUsers, getUsersSlice, user, userMsg, userStatus } from '../../../shared/redux/features/usersSlice'
import MsgItem from './msgItem'




export default function Msg() {
    const dispatch = useDispatch()
    const nav = useNavigate()

    const token = useSelector((state) => state.token.token)
    const messagessArr = useSelector(userMsg)
    const requestStatus = useSelector(userStatus)
    const usersSlice = useSelector(getUsersSlice)

    // const users = useSelector((state) => state.users.users)
    // const user = useSelector((state) => state.user)
    // const id = useSelector(userID)

    const doApi = async () => {
        console.log(usersSlice);
        console.log(requestStatus)
        dispatch(getUser())
    }
    useEffect(() => {
        dispatch(AuthWithToken())
        if (token === null) {
            toast.warn("there is problem, please log in")
            nav("/login")
        }
        doApi()
    }, [])

    return (
        <div className='container'>
            <div className='row mx-auto col-md-6'>
                {requestStatus === "succeeded" && messagessArr.map(item => {
                    return (
                        <div key={item._id}>
                            <MsgItem item={item} />
                        </div>
                    )
                })
                }

                {requestStatus === "succeeded" && messagessArr.length === 0 &&

                    <div className='container mt-5 text-center'>
                        <h1>אין עוד הודעות ..</h1>
                    </div>
                }
            </div>
        </div>
    )
}