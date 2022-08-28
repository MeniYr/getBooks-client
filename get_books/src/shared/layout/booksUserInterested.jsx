import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { delivery, getDeliveries } from "../redux/features/deliverySlice";
import { user_from_token } from "../redux/features/tokenSlice";
import { getUsersSlice } from "../redux/features/usersSlice";

export default function BooksUserInterested() {
  const dispatch = useDispatch(getDeliveries());
  const { id, error } = useSelector(user_from_token);
  const { deliveries } = useSelector(delivery);
  const { addNote_status } = useSelector(getUsersSlice);
  const [interestedBooks, setInterestedBooks] = useState([]);
  // useEffect(() => {
    // const a = () => {
    
    //   let a = deliveries.find(item=>
    //     item==="interestedUsersID"
    
    //   );
    //   let b = a?.filter((item) => item === id);
    //   return a;
    // };
  //   setInterestedBooks(a());
  //   console.log(interestedBooks);
  // }, [deliveries, addNote_status]);

  return <div>BooksUserInterested</div>;
}
