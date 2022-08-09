import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link,useNavigate } from 'react-router-dom'
import { user_from_token } from '../../../shared/redux/features/tokenSlice'
import { delUser, getUser, getCurrentUser, getUsers } from '../../../shared/redux/features/usersSlice'
import SendMsg from './sendMsg'



export default function UserItem(props) {
    const dispatch = useDispatch()
    const currentUserDetailes = useSelector(getCurrentUser)
    const user = props.item
    const nav = useNavigate();
    const del = (idDel) => {
        dispatch(delUser(idDel))
        dispatch(getUsers())
    }
    let hide = { display: "none" }

    useEffect(() => {
        console.log(currentUserDetailes);
        console.log(user);
    }, [])

    return (

        <div key={user._id} className='border d-flex  my-3 p-2'>
            <div>
                <h2>שם: {user.name}</h2>
                <h2>כתובת: {user.address}</h2>
                <h2>טלפון: {user.phone}</h2>
                <h2>אימייל: {user.email}</h2>
                <h2 style={hide}>תאריך הצטרפות: {user.join_date}</h2>
                <h2>מסכים לשתף מייל: {user.isShareMail === true ? "כן" : "לא"}</h2>
                <h2>מסכים לשתף טלפון: {user.isSharePhone === true ? "כן" : "לא"}</h2>
                <Link
                    style={{
                        display: currentUserDetailes?._id === user._id ? "none" : "inline-flex"

                    }}
                    className='btn btn-outline-primary'
                    to={`/sendMsg/${user._id}`}>
                    seng message
                </Link>
                <div className='d-flex justify-content-between'>

            <Link to={`/editUSer/${user._id}`} className='btn btn-info d-inline-flex'>Edit</Link>
            <button className='btn btn-outline-success' onClick={()=>nav(-1)}>Back</button>
                </div>
            </div>


            <div
                style={{
                    cursor: "pointer",
                    display: ((currentUserDetailes?._id === user._id) || (currentUserDetailes?.role === "user")) ? "none" : "block"
                }}
                className='link-danger'
                onClick={() => { del(user._id) }} >
                X
            </div>
        </div>

    )
}
