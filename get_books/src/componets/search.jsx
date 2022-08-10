import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { books } from '../shared/redux/features/bookSlice'
import Book from './userCMS/bookStory/book';

export default function Search() {
  // const dispatch = useDispatch()
  const { status, srchRes } = useSelector(books)

  useEffect(() => {
    console.log(srchRes);
    console.log(status);
  }, [status])

  return (
    <div className='container d-flex align-items-center justify-content-center'>
      <div className="row">
   
          <div className="p-2">
            {status === "succeeded" && srchRes?.length > 0 &&
              srchRes?.map(item => {
                return (
                  <div key={item._id}>
                    <Book book={item} />
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
