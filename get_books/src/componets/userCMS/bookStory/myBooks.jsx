import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify"
import { bookStatus, getAllBooks, getBooks } from '../../../shared/redux/features/bookSlice';
import Book from './book';

export default function MyBooks() {
    const dispatch = useDispatch();
    const nav = useNavigate();
    const books = useSelector(getAllBooks)
    const status = useSelector(bookStatus)

    useEffect(() => {
        dispatch(getBooks())
    }, [])

    return (
        <div className='container'>
            <div className='row mx-auto col-md-8 text-center'>
                {status === "succeeded" && books.map(item => {
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
