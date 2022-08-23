import React, { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useSelector } from 'react-redux';
import moment from 'moment'

import { getUsersSlice } from '../../../shared/redux/features/usersSlice';
import "./books.module.css";

export default function FullBook() {
  const { bookId } = useParams()
  console.log(bookId);
  return (
    <div>fullBook</div>
  )
}
