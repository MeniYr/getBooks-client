import React, { useState } from 'react'
import moment from 'moment'

export default function Book(props) {
    let book = props.book

    const [clicked, SetClicked] = useState(false)

    let imageStyle = {
        borderRadius: "15px",
        width: "290px",
        height: "250px"
    }

    return (
        <div className="m-4 border border-secondary border-3 border-opacity-50">

            <div className='p-2'>

                <div className='float-md-start d-flex align-items-md-center justify-content-center'>
                    <img
                        style={imageStyle}
                        src={book.image ? book.image : "https://images.unsplash.com/photo-1576872381149-7847515ce5d8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2536&q=80"}
                        alt="book photo"
                    />
                </div>
                <div >
                    <h2> <span className='fw-bolder'>שם הספר: </span> {book.name}</h2>
                    <h2> <span className='fw-bolder'>מחבר: </span>{book.author}</h2>
                    <h2><span className='fw-bolder'>קטגוריה: </span> {book.cat_id?.category}</h2>
                    <h2><span className='fw-bolder'>עמודים: </span> {book.pages}</h2>
                    <h2><span className='fw-bolder'> הוצאה לאור: </span> {book.publishing_year}</h2>
                    <h2><span className='fw-bolder'> הועלה בתאריך: </span> {moment(book.created_at).format('DD/MM/YYYY')}</h2>
                    <h2><span className='fw-bolder'> תאור: </span> {book.description}</h2>
                    {book.comments?.length > 0 && <div
                    className='text-center'
                    >
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
        </div>
    )
}
