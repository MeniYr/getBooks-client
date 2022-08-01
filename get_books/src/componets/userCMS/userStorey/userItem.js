import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { user_from_token } from '../../../shared/redux/features/tokenSlice'
import { delUser, getUsers } from '../../../shared/redux/features/usersSlice'
import SendMsg from './sendMsg'



export default function UserItem(props) {
    const dispatch = useDispatch()
    const userDetailes = useSelector(user_from_token)
    const user = props.item

    const del = (idDel) => {
        dispatch(delUser(idDel))
        dispatch(getUsers())
     
    }
    return (

        <div key={user._id} className='border d-flex  my-3 p-2'>
            <div>
                <h2>שם: {user.name}</h2>
                <h2>כתובת: {user.address}</h2>
                <h2>טלפון: {user.phone}</h2>
                <h2>אימייל: {user.email}</h2>
                <h2>תאריך הצטרפות: {user.join_date}</h2>
                <h2>מסכים לשתף מייל: {user.isShareMail === true ? "כן" : "לא"}</h2>
                <h2>מסכים לשתף טלפון: {user.isSharePhone === true ? "כן" : "לא"}</h2>
                <Link className='btn btn-outline-primary' to={`/sendMsg/${user._id}`}>seng message</Link>
            </div>


            <div
                style={{
                    cursor: "pointer",
                    display: userDetailes.role === "user" ? "none" : "block"
                }}
                className='link-danger'
                onClick={() => { del(user._id) }} >
                X
            </div>
        </div>

    )
}
