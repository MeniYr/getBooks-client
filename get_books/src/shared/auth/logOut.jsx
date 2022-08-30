import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { logOutFromToken } from '../redux/features/tokenSlice'
import { logOutFromUsers } from '../redux/features/usersSlice'
import { useNavigate } from 'react-router-dom'
import { logOutFromBooks } from '../redux/features/bookSlice'
import { pause, persistor, re, register, reset } from '../..'


export default function Logout() {
    const dispatch = useDispatch()
    const nav = useNavigate()

    useEffect(() => {
        // register()
        // re()
        logOut()
    }, [])
    
    const logOut = async () => {
        
        console.log("logout");
        dispatch(logOutFromUsers())
        dispatch(logOutFromToken())
        dispatch(logOutFromBooks())
        nav("/")
        await reset()
    }

    return (
        <div>

        </div>
    )
}
