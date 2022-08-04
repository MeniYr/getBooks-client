import React, { useState } from 'react'
import moment from 'moment'
import { Cookie } from '@mui/icons-material'
export default function Book(props) {
    let book = props.book

    const [clicked, SetClicked] = useState(false)

    let imageStyle = {
        borderRadius: "15px",
        width: "290px",
        height: "250px"
    }

    return (
        <div className='p-2 '>
            {book.image && <div className='float-md-start d-flex align-items-md-center justify-content-center'>
                <img style=
                    {imageStyle}
                    src={book.image} />
            </div>}
            <div >
                <h2> <span className='fw-bolder'>שם הספר: </span> {book.name}</h2>
                <h2> <span className='fw-bolder'>מחבר: </span>{book.author}</h2>
                <h2><span className='fw-bolder'>קטגוריה: </span> {book.cat_id.category}</h2>
                <h2><span className='fw-bolder'>עמודים: </span> {book.pages}</h2>
                <h2><span className='fw-bolder'> הוצאה לאור: </span> {book.publishing_year}</h2>
                <h2><span className='fw-bolder'> הועלה בתאריך: </span> {moment(book.created_at).format('DD/MM/YYYY')}</h2>
                <h2><span className='fw-bolder'> תאור: </span> {book.description}</h2>
                {book.comments.length > 0 && <div>
                    <button onClick={() => { SetClicked(!clicked) }} className='btn btn-outline-secondary w-75 m-3'>תגובות</button>
                    {
                        clicked && book.comments.map(comment => {
                            return (
                                <div className='border border-primary p-2 m-4' key={comment._id}>
                                    <h2>{moment(comment.date).format('DD-MM-YYYY, HH:mm')}</h2>
                                    <h2><span className='fw-bolder'>מאת: </span> {comment.fromUser.name}</h2>
                                    <p className='display-5 border border-3'> <span className='fw-bolder'>תוכן: </span>{comment.msg}</p>
                                </div>
                            )
                        })
                    }
                </div>}
            </div>

        </div>
    )
}
