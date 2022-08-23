import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment'

import { getUsersSlice } from '../../../shared/redux/features/usersSlice';
import "./books.module.css";
import { booksS, findBook } from '../../../shared/redux/features/bookSlice';

export default function FullBook() {
  const dispatch = useDispatch()
  const { currentBook } = useSelector(booksS)
  const { bookId } = useParams()


  useEffect(() => {
    dispatch(findBook(bookId))
    console.log(currentBook);
  }, [bookId])
  return (
    <div>
      <div style={{

      }}
        className=''
      >
        <div
          style={{
            backgroundImage: `url(${currentBook?.image})`,
            backgroundPosition: "center",
            filter: "blur(7px)",
            width: "100%",
            position: "relative",
            // opacity:0.3,
            height: "400px"
          }}
          className='d-flex'>
        </div>

        <div>
          <img
            style={{
              position: "absolute",
              top: "50px"
            }}
            className="border border-5"
            width="200"
            height="300"
            src={currentBook?.image} alt={currentBook?.name} />
        </div>

        <div>

        </div>
      </div>
      פרטים נוספים
    </div>
  )
}
