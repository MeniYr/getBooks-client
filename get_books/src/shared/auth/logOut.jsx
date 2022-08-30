import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { logOutFromToken } from '../redux/features/tokenSlice'
import { logOutFromUsers } from '../redux/features/usersSlice'
import { useNavigate } from 'react-router-dom'
import { logOutFromBooks } from '../redux/features/bookSlice'
import { persistor, reset } from '../..'


export default function Logout() {
    const dispatch = useDispatch()
    const nav = useNavigate()

    useEffect(() => {
        reset()
        logOut()
    }, [])
    
 const logOut = async () => {
       
        console.log("logout");
        dispatch(logOutFromUsers())
        dispatch(logOutFromToken())
        dispatch(logOutFromBooks())
        nav("/")
    }

    return (
        <div>

        </div>
    )
}
