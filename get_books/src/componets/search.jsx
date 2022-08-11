import moment from 'moment';
import React, { useEffect, useState } from 'react'
import ReactStars from 'react-rating-stars-component';
import { useSelector } from 'react-redux';
import { books } from '../shared/redux/features/bookSlice'
import Book from './userCMS/bookStory/book';
import { GrFavorite } from "react-icons/gr"
import { MdOutlineFavorite } from "react-icons/md"
import { Button, IconButton, Tooltip } from '@mui/material';

export default function Search() {
  // const dispatch = useDispatch()
  const { status, srchRes } = useSelector(books)
  const [innerWidthSize, setInnerWidthSize] = useState(window.innerWidth)
  const rating = (rate_num) => {
    console.log(rate_num);
    let isInt = Number.isInteger(rate_num);
    let num = Number(rate_num);
    if (!isInt && (Math.ceil(num) > num)) {
      return Math.floor(num) + 0.5
    }
    else
      return num;

  };



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

  return (
    <div className='container d-flex align-items-center justify-content-center mt-5 pb-5'>
      <div
        style={{
          width: innerWidthSize < 768 ? "auto" : "700px",
        }}
        className="row">

        <div

          className="p-2 ">
          {status === "succeeded" && srchRes?.length > 0 &&
            srchRes?.map((item, i) => {
              return (
                <div key={item._id}>

                  <div className="d-md-flex p-2 ">
                    {/* right */}
                    <div
                      className="d-md-flex ">
                      <div className='ps-3'>
                        <img
                          className='shadow rounded-1'
                          src={item.image ? item.image : "https://images.unsplash.com/photo-1576872381149-7847515ce5d8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2536&q=80"}
                          alt="book pic"
                          width={177}
                          height={279}
                        />
                      </div>
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

                          <IconButton >
                            מעוניין
                          </IconButton>


                        </div>
                      </div>
                      {/* <Book book={item} /> */}
                    </div>

                    {/* left */}
                    <div className='my-5 shadow-lg rounded-circle'
                      style={{
                        backgroundImage: `url(${"https://images.unsplash.com/photo-1621944190310-e3cca1564bd7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"})`,
                        backgroundPosition:"center",
                        backgroundSize:"cover",
                        backgroundRepeat: 'no-repeat',
                        minWidth: '170px',
                        height: '190px'
                        
                      }}
                    >
                      <div className=" ">
                        <p>מרחק מאזור מגוריך: {}</p>

                      </div>
                    </div>

                  </div>

                  {i < srchRes.length - 1 && <hr />}
                </div>
              )
            })
          }
          {status === "loading" &&
            <div>
              Loading...
            </div>
          }
          {status === "failed" &&
            <div>
              server problem try again
            </div>
          }
        </div>

      </div>
    </div>
  )
}
