import { StepIcon, SvgIcon } from '@mui/material';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { MdImportContacts } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { delivery, getDeliveries } from '../shared/redux/features/deliverySlice'
import { Button, IconButton, Tooltip } from '@mui/material';
import { getUsersSlice } from '../shared/redux/features/usersSlice';

export default function IsInterested(props) {
    const { book } = props;
    const { currentUser, } = useSelector(getUsersSlice)
    const { deliveries } = useSelector(delivery)
    const [isExist, setIsExist] = useState([])


    useEffect(() => {
        setIsExist(deliveries.filter(a => a.bookID === book._id));
    }, [deliveries])
    return (
        <div>
            {isExist?.map(item => {
                return (
                    <>
                        {item.interestedUsersID.includes(currentUser?._id) ? <p>🔖</p> : <></>}
                    </>
                )
            })}
        </div>
    )
}
