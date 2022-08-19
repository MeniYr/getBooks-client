import { StepIcon, SvgIcon } from '@mui/material';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { MdImportContacts } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { delivery, getDeliveries } from '../shared/redux/features/deliverySlice'
import { Button, IconButton, Tooltip } from '@mui/material';

export default function IsInterested(props) {
    const { book } = props;
    const { deliveries } = useSelector(delivery)
    const [isExist, setIsExist] = useState([])
  const dispatch = useDispatch()


    useEffect(() => {
    // dispatch(getDeliveries())

                // const bookid = 

                setIsExist(deliveries.filter(a=>a.bookID===book._id));
            console.log(isExist);    
// return()=>{
//     dispatch(getDeliveries())

// }
    }, [deliveries])
    return (

        <div>
            {/* {deliveries.find(element => {
            if (element?.bookID === item._id) {
                if (element?.interestedUsersID.filter(user =>
                    user === item.userID?._id
                ).length>0)
                    return (<h2>V</h2>)
            }

        })
        } */}
        {isExist?<h2>true</h2>:0}
        {isExist?.map(item=>{
            return(
                <div>{item.bookID===book._id&& (item.interestedUsersID===book.usedID?._id)?<IconButton>מעוניין</IconButton>:2}
                <h2>{item.interestedUsersID.includes(book.userID._id)?1:2}</h2>
                </div>
            )
        })}
        </div>
    )
}
