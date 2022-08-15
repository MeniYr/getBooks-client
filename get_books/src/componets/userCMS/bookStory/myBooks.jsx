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
    const user_id = useSelector(getCurrentUser)?._id

    useEffect(() => {
        user_id!=undefined&&dispatch(getBooks())
        user_id===undefined&&toast.info("נא התחבר")&&nav("/login")
    }, [])
    useEffect(() => {
    
        user_id!=undefined&&dispatch(myBooks(user_id))

    }, [user_id])

    return (
        <div className='container'>
            <div className='row mx-auto col-md-8 text-center'>
                {status === "succeeded" && get_myBooks?.map(item => {
                    return (
                        <div
                            style={{
                                borderRadius: "15px"
                            }}
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
