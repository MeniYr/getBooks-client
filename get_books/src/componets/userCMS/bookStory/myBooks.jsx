import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify"
import { bookStatus, getAllBooks, getBooks, getMyBooks, myBooks, myBooksStatus } from '../../../shared/redux/features/bookSlice';
import { userID } from '../../../shared/redux/features/tokenSlice';
import { getCurrentUser } from '../../../shared/redux/features/usersSlice';
import Book from './book';

export default function MyBooks() {
    const dispatch = useDispatch();
    const nav = useNavigate();
    const books = useSelector(getAllBooks)
    const get_myBooks = useSelector(getMyBooks)
    const status = useSelector(myBooksStatus)
    const user_id = useSelector(getCurrentUser)

    useEffect(() => {
        user_id?._id!=null&&dispatch(getBooks())
        user_id?._id===null&&toast.info("נא התחבר")&&nav("/login")
    }, [])
    useEffect(() => {
    
        user_id?._id!=null&&dispatch(myBooks(user_id))

    }, [user_id])

    return (
        <div className='container'>
            <div className='row'>
                {status === "succeeded" && get_myBooks?.map(item => {
                    return (
                        <div
                        className='p-2 '
                            key={item._id} 
                        >
                            <Book book={item} />
                        </div>
                    )
                })}
            </div>

        </div>
    )
}
