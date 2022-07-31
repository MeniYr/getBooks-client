import React from 'react'

export default function UserItem(props) {
    const user = props.item
    return (

        <div key={user._id} className='border  my-3 p-2'>
            <h2>שם: {user.name}</h2>
            <h2>כתובת: {user.address}</h2>
            <h2>טלפון: {user.phone}</h2>
            <h2>אימייל: {user.email}</h2>
            <h2>תאריך הצטרפות: {user.join_date}</h2>
            <h2>מסכים לשתף מייל: {user.isShareMail === true ? "כן" : "לא"}</h2>
            <h2>מסכים לשתף טלפון: {user.isSharePhone === true ? "כן" : "לא"}</h2>
        </div>

    )
}
