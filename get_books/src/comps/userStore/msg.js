import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { AuthWithToken, user, userID, userId, user_ID } from '../../features/tokenSlice'
import { getUsers } from '../../features/usersSlice'
import { myStore } from '../../globalStore/store'
import { API_URL, doApiGet, doApiMethod } from '../../services/apiService'


export default function Msg() {
    const dispatch = useDispatch()
    const nav = useNavigate()
    const token = useSelector((state) => state.token.token)
    // const users = useSelector((state) => state.users.users)
    const alltoken = useSelector((state) => state.token)
    const id = useSelector(userID)

    const doApi = async () => {
        console.log(alltoken)
        // const messages =await doApiGet(`${API_URL}/users/${userID}`).messages
    }
    useEffect(() => {
        console.log(myStore.getState())
        dispatch(AuthWithToken())

        if (token === null) {
            nav("/login")
        }
        doApi()
    }, [id])
    return (
        <div className='container'>
            <div className='row mx-auto col-md-6'>

            </div>
        </div>
    )
}
