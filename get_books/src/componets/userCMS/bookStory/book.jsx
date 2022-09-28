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
                <div className='text-md-end mx-auto my-auto'>

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

        </div>
    )
}
