import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { AuthWithToken, userID } from '../../../shared/redux/features/tokenSlice'
import { allUsers, getUser, getUserByID, getUsers, getUsersSlice, user, userMsg, userStatus } from '../../../shared/redux/features/usersSlice'
import MsgItem from './msgItem'
import UserItem from './userItem'




export default function Msg() {
    const dispatch = useDispatch()
    const nav = useNavigate()
    const token = useSelector((state) => state.token.token)
    const messagessArr = useSelector(userMsg)
    const requestStatus = useSelector(userStatus)
    const usersSlice = useSelector(getUsersSlice)

    const fromUser = useSelector((state) => state.users)

    // const users = useSelector((state) => state.users.users)
    // const user = useSelector((state) => state.user)
    // const id = useSelector(userID)

    const initPageInfo = async () => {
        console.log(usersSlice);
        console.log(requestStatus)
        console.log(fromUser)

        dispatch(getUser())
        dispatch((getUserByID("62e10c6455663afe779f5f6es")))
    }
    useEffect(() => {

        dispatch(AuthWithToken())
        if (token === null) {
            toast.warn("there is problem, please log in")
            nav("/login")
        }
        initPageInfo()
    }, [])

    return (
        <div className='container'>
            <div className='row mx-auto col-md-6'>
                {requestStatus === "succeeded" &&  messagessArr.map(item => {
                    return (
                        <div key={item._id}>
                            <MsgItem item={item} />
                            {/* <Link>from: <UserItem item={fromUser} /></Link> */}
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