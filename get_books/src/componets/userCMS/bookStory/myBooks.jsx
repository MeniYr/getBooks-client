import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify"
import { bookStatus, getAllBooks, getBooks, getMyBooks, myBooks } from '../../../shared/redux/features/bookSlice';
import { userID } from '../../../shared/redux/features/tokenSlice';
import { getCurrentUser } from '../../../shared/redux/features/usersSlice';
import Book from './book';

export default function MyBooks() {
    const dispatch = useDispatch();
    const nav = useNavigate();
    const books = useSelector(getAllBooks)
    const get_myBooks = useSelector(getMyBooks)
    const status = useSelector(bookStatus)
    const user_id = useSelector(getCurrentUser)?._id
    
    // useEffect(() => {
    //     dispatch(getBooks())
    // }, [])
    useEffect(()=>{
        console.log(user_id);
        dispatch(myBooks(user_id))

    },[user_id])

    return (
        <div className='container'>
            <div className='row mx-auto col-md-8 text-center'>
                {status === "succeeded" && get_myBooks?.map(item => {
                    return (
                        <div style={{
                            borderRadius:"15px"
                        }} key={item._id} className="border border-3 m-4">
                            <Book book={item} />
                        </div>
                    )
                })}
            </div>

        </div>
    )
}
