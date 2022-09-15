import React, { useState } from 'react'
import moment from 'moment'
import ReactStars from 'react-rating-stars-component'
import { TextareaAutosize, TextField, Tooltip } from '@mui/material'
import MoreIcon from '@mui/icons-material/MoreVert';
import { useDispatch, useSelector } from 'react-redux';
import { getUsersSlice } from '../../../shared/redux/features/usersSlice';
import { Link } from 'react-router-dom';
import myStyle from "./books.module.css";
import { doApiMethod } from '../../../shared/services/apiService';
import { BOOKS } from '../../../shared/constants/globalinfo/URL`S';
import { getBooks } from '../../../shared/redux/features/bookSlice';

export default function Book(props) {
    const dispatch = useDispatch()
    const { currentUser } = useSelector(getUsersSlice)
    let book = props.book
    // console.log(book);
  
    
    const rating = async (_num) => {
        console.log(_num);
        let isInt = Number.isInteger(_num);
        let num = Number(_num);
        if (!isInt && Math.ceil(num) > num) {
          num = Math.floor(num) + 0.5;
        }
        let sendRate = await doApiMethod(
          `${BOOKS}/addRate/${book._id}`,
          "PUT",
          { num }
        );
        // dispatch(());
        console.log(sendRate.data);
      };

    const [clicked, SetClicked] = useState(false)

    let imageStyle = {
        borderRadius: "5px",
        width: "170px",
        height: "220px"
    }

    return (

        <div style={{
            width: "207px",
            height: "380px"
        }} >
            <div className='p-2 text-center d-grid h-100'>
                <Link to={`/fullBook/${book._id}`}>
                    <img
                        className={`shadow ${myStyle.book}`}
                        style={imageStyle}
                        src={book.image ? book.image : "https://images.unsplash.com/photo-1576872381149-7847515ce5d8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2536&q=80"}
                        alt="book photo"
                    />

                </Link>

                <h4 className='fs-5 p-2 pb-0 mb-0 text-md-end '>{book.name}</h4>
                <div className='text-md-end my-auto'>
                    {/* <span className='fw-bolder'>מחבר: </span>{book.author} */}
                    {/* <br />  */}
                    <ReactStars
                        count={5}
                        size={30}
                        activeColor="#ffd700"
                        onChange={(e) =>currentUser!==null&& rating(e)}
                        value={book?.rate/book?.rateQuanity}
                        a11y={true}
                        isHalf={true}
                        edit={currentUser!==null&& currentUser?._id !== book.userID?._id ? true : false}
                    />

                </div>


            </div>

            {/* </div> */}

            {/* <div className="m-4 border-secondary border-3 border-opacity-50">

            <div className='p-4 d-md-flex justify-content-center'>

             <div className='float-md-end d-block align-items-center justify-content-center'>
                    <div>
                        <img
                            style={imageStyle}
                             src={book.image ? book.image : "https://images.unsplash.com/photo-1576872381149-7847515ce5d8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2536&q=80"}
                             alt="book photo"
                         />

                     </div>
                     <div className='mt-2 '>
                         <p>דירוג משתמשים: </p>
                         <label>דירוג הספר</label>
                         <ReactStars
                            count={5}
                            size={30}
                            activeColor="#ffd700"
                            onChange={(e) => rating(e)}
                            value={rating}
                            a11y={true}
                            isHalf={true}
                            edit={true}
                        />
                    </div>
                </div>
                <div className='mx-md-3'>
                    <h1 className='text-center display-2 fw-bold'>{book.name}</h1>
                    <div className="d-md-flex justify-content-md-between">
                        <h2><span className='fw-bolder'>ז'אנר: </span> {book.cat_id.category}</h2>
                        <h2> <span className='fw-bolder'>מחבר: </span>{book.author}</h2>
                    </div>

                    <h2><span className='fw-bolder'> תקציר / מידע: </span></h2>
                    <div className=' overflow-auto me-auto w-75'>
                        <h3 > {book.description}</h3>
                    </div>
                    <h2><span className='fw-bolder'>עמודים: </span> {book.pages}</h2>
                    <h2><span className='fw-bolder'> הוצאה לאור: </span> {book.publishing_year}</h2>
                    <h2><span className='fw-bolder'> הועלה בתאריך: </span> {moment(book.created_at).format('DD/MM/YYYY')}</h2>

                </div>
                <div className=''>

                <Tooltip title="מידע נוסף">
                        <button
                            onClick={() => { SetClicked(!clicked) }}
                            className='btn btn-outline-info border-1 rounded-circle text-danger'
                        >
                                <MoreIcon />
                        </button>
                            </Tooltip>
                </div>
            </div>
            <>{
                book.comments?.length > 0 && <div
                    className=' w-md-75'
                >
                    <div>
                        {
                            book.comments.map(comment => {
                                return (
                                    <div className='border rounded-3 p-2 m-4 text-center' key={comment._id}>
                                        <h2>{moment(comment.date).format('DD-MM-YYYY, HH:mm')}</h2>
                                        <h2><span className='fw-bolder'>מאת: </span> {comment.fromUser.name}</h2>
                                        <p className='display-5 border-3'> <span className='fw-bolder'>תוכן: </span>{comment.msg}</p>
                                    </div>
                                )
                            })
                        }
                    </div>

                </div>
            }
            </>
        </div>*/}
        </div>
    )
}
