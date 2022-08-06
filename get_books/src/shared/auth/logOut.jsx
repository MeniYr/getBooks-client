import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { logOutFromToken } from '../redux/features/tokenSlice'
import { logOutFromUsers } from '../redux/features/usersSlice'
import { useNavigate } from 'react-router-dom'


export default function Logout() {
    const dispatch = useDispatch()
    const nav = useNavigate()

    useEffect(() => {
        logOut()
    }, [])
    
    const logOut = () => {
        console.log("logout");
        dispatch(logOutFromUsers())
        dispatch(logOutFromToken())
        nav("/")
    }

    return (
        <div>

        </div>
    )
}
