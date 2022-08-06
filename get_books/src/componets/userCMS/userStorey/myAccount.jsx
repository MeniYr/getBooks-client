import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AuthWithToken, user_from_token } from '../../../shared/redux/features/tokenSlice'
import styles from "./account.module.css"
import { useNavigate, Link } from 'react-router-dom';
import { toast } from "react-toastify"


export default function MyAccount() {
    const dispatch = useDispatch()
    const checkErrorAuth = useSelector(user_from_token).error
    const nav = useNavigate()

    useEffect(() => {
        if (checkErrorAuth != null) {
            toast.warning("please log in")
            nav("/login")

        }

    }, [checkErrorAuth])

    return (
        <div className='container'>
            <div className='d-flex justify-content-end mt-3'>
                <button className='btn btn-outline-success  ' onClick={() => nav(-1)}>Back</button>

            </div>
            <div className={`m-md-5 text-center row ${styles.account}`}>

                <Link to="/msg" className={`shadow ${styles.links}`}>
                    הודעות
                </Link>

                <Link to="/myProfile" className={`shadow ${styles.links}`}>
                    הפרופיל שלי
                </Link>

                <Link to="/myBooks" className={`shadow ${styles.links}`}>
                    הספרים שלי
                </Link>

                <Link to="/favs" className={`shadow ${styles.links}`}>
                    מועדפים
                </Link>

            </div>
        </div>
    )
}
