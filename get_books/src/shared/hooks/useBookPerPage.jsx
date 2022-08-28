import React, { useEffect } from "react";
import { useState } from "react";
import { BOOKS } from "../constants/globalinfo/URL`S";
import { doApiGet, doApiMethod } from "../services/apiService";

export default function UseBookPerPage(query, pageNumber) {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [books, setBooks] = useState([])
    const [hasMore, setHasMore] = useState(false)

    useEffect(()=>{
setBooks([])
    },[pageNumber])

  useEffect(() => {
    setLoading(true)
    setError(false)
   
    doApiGet(`${BOOKS}/perPage?=${5}`).then(res => {
        setBooks(prevBooks => {
            return [...new Set([...prevBooks, res.data])]
        })
        setHasMore(books.length>0)
        console.log(res.data);
    }).catch(e =>{
        if (e) return setError(true)
    })
setLoading(false)
  }, [pageNumber, query]);
  return {loading,error,books,hasMore};
}
