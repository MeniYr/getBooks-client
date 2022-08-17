import moment from 'moment';
import React, { useEffect, useState } from 'react'
import ReactStars from 'react-rating-stars-component';
import { useDispatch, useSelector } from 'react-redux';
import { books, booksS } from '../shared/redux/features/bookSlice'
import Book from './userCMS/bookStory/book';
import { GrFavorite } from "react-icons/gr"
import { MdOutlineFavorite } from "react-icons/md"
import { Button, IconButton, Tooltip } from '@mui/material';
import { addNotify, getUsers, getUsersSlice, isUserNotifyAlready } from '../shared/redux/features/usersSlice';
import { toast } from "react-toastify"
import { addInterestedID, createDelivery, delInterestedID, delivery, getDeliveries } from '../shared/redux/features/deliverySlice';
import { useNavigate } from 'react-router-dom';

export default function Search() {
  const dispatch = useDispatch()
  const nav = useNavigate();

  const { srchBooks_status, srchRes, books } = useSelector(booksS)
  const { addNote_status, currentUser, userNotifyAlready } = useSelector(getUsersSlice)
  const { deliveries } = useSelector(delivery)
  const [innerWidthSize, setInnerWidthSize] = useState(window.innerWidth)
  const [notifyClicked, setNotifyClicked] = useState(false)
  const [isSameBook, setIsSameBook] = useState(false)
  const [book_id, setBook_id] = useState("")
  // rating
  const rating = (rate_num) => {
    // console.log(rate_num);
    let isInt = Number.isInteger(rate_num);
    let num = Number(rate_num);
    if (!isInt && (Math.ceil(num) > num)) {
      return Math.floor(num) + 0.5
    }
    else
      return num;

  };


  // screen size check
  useEffect(() => {
    window.addEventListener('resize', () => {
      setInnerWidthSize(window.innerWidth)
    });


    return () => {
      window.addEventListener('resize', () => {
        setInnerWidthSize(window.innerWidth)
      })
    }
  }, [innerWidthSize])

  // succeeded notify
  useEffect(() => {
    addNote_status === "succeeded" && (!userNotifyAlready) && toast.success("הודעה נשלחה למוסר")
  }, [addNote_status])

  useEffect(() => {
    currentUser !== null && dispatch(getUsers())
  }, [])

  useEffect(() => {
    return () => {
      dispatch(getUsers())
    }
  }, [])
  useEffect(() => {
    console.log(book_id);
    dispatch(getDeliveries())
    notifyClicked && dispatch(addInterestedID(book_id))
    notifyClicked === false && dispatch(delInterestedID(book_id))
  }, [notifyClicked])



  const notifyControl = (notify) => {
    // console.log(userNotifyAlready);
    // if (!userNotifyAlready)
    dispatch(addNotify(notify))

  }
  const interestedControle = (book) => {
    let sameBook, sameUser;
    
    deliveries.forEach(item => {
      setIsSameBook(false)
      console.log(item);
      item.bookID === book._id &&
        item.interestedUsersID.find(user_id => {
          sameBook=true;
          sameUser = false;
          sameUser = (user_id === book.userID._id);

          console.log(sameBook && sameUser);
          
        });
        if (sameBook && sameUser){
          console.log(isSameBook);
          return setIsSameBook(sameBook && sameUser);
        }
    })

  }


  return (
    <div className='container d-flex align-items-center justify-content-center mt-5 pb-5'>
      <div
        style={{
          width: innerWidthSize < 768 ? "auto" : "700px",
        }}
        className="row">

        <div

          className="p-2 ">
          {srchBooks_status === "succeeded" && srchRes?.length > 0 &&
            srchRes?.map((item, i) => {
              return (
                <div key={item._id}>

                  <div className="d-md-flex p-2 ">
                    {/* right */}
                    <div
                      className="d-md-flex ">
                      {/* img */}
                      <div className='ps-3'>
                        <img
                          className='shadow rounded-1'
                          src={item.image ? item.image : "https://images.unsplash.com/photo-1576872381149-7847515ce5d8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2536&q=80"}
                          alt="book pic"
                          width={177}
                          height={279}
                        />
                      </div>

                      {/* props */}
                      <div>
                        <h2 className=''>{item.name}</h2>
                        <p>{item.author}</p>
                        <ReactStars
                          count={5}
                          size={30}
                          activeColor="#ffd700"
                          onChange={(e) => rating(e)}
                          value={rating}
                          a11y={false}
                          isHalf={false}
                          edit={false}
                        />
                        <article className='d-flex'>
                          <p className='border-start border-opacity-50 ps-1 border-dark'>
                            {item.cat_id.category}
                          </p>
                          <p className='border-start border-opacity-50 px-1 border-dark'>{item.publishing_year}</p>
                          <p className='border-start border-opacity-50 px-1 border-dark'>{item.pages} עמודים </p>
                          <p className='pe-1'>הועלה {moment(item.created_at).format('DD/MM/YYYY')}</p>
                        </article>
                        <p
                          style={{
                            width: innerWidthSize < 768 ? "auto" : "500px",
                          }}
                          className='overflow-auto'>{item.description}</p>
                        {/* favs */}
                        <div className='d-flex align-items-center justify-content-between'>
                          <Tooltip
                            title="הוספה למועדפים"
                            placement="bottom-end"
                          >
                            <p className='fs-5 mt-md-2'
                              style={{
                                cursor: "pointer"
                              }}
                            >
                              {/* &nbsp; */}
                              <GrFavorite />
                              {/* <MdOutlineFavorite /> */}
                            </p>
                          </Tooltip>

                          <IconButton
                            className={`shadow ${notifyClicked && isSameBook ? "bg-info" : "bg-white"}`}
                            onClick={() => {
                              let notify = {
                                fromUserId: currentUser?._id,
                                toUserId: item.userID._id,
                                bookID: item._id,
                              }
                              setBook_id(item._id)
                      
                              setNotifyClicked(!notifyClicked)
                              interestedControle(item)
                            }}
                          >
                            מעוניין
                          </IconButton>


                        </div>
                      </div>
                      {/* <Book book={item} /> */}
                    </div>

                    {/* left */}
                    {/* TODO USER PROFILE */}
                    {currentUser !== null && <div className='bg-light d-flex shadow-lg rounded-circle'
                      style={{
                        minWidth: '160px',
                        height: '160px',

                      }}
                    >
                      <div className='my-auto mx-auto text-center text-wrap fw-bolder'>
                        <p className='text-muted ' >משתמש: {item.userID?.name}</p>
                        <p className='text-muted '> עיר: {item.userID?.city}</p>
                        <button
                          onClick={() => { nav(`/sendMsg/${item.userID?._id}`) }}
                          className="btn btn-outline-info rounded-circle">הודעה</button>
                      </div>

                    </div>
                    }
                  </div>

                  {i < srchRes.length - 1 && <hr />}
                </div>
              )
            })
          }
          {srchBooks_status === "loading" &&
            <div>
              Loading...
            </div>
          }
          {srchBooks_status === "failed" &&
            <div>
              server problem try again
            </div>
          }
        </div>

      </div>
    </div>
  )
}
