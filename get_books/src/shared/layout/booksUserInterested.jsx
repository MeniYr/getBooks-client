import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { delivery, getDeliveries } from "../redux/features/deliverySlice";
import { user_from_token } from "../redux/features/tokenSlice";
import { getUsersSlice } from "../redux/features/usersSlice";

export default function BooksUserInterested() {
  const dispatch = useDispatch(getDeliveries());
  const { id, error } = useSelector(user_from_token);
  const { deliveries } = useSelector(delivery);
  const { addNote_status,currentUser } = useSelector(getUsersSlice);
  const [interestedBooks, setInterestedBooks] = useState([]);

  useEffect(() => {
  dispatch(getDeliveries())
    const a = () =>{
      let array=[];
      if(deliveries){
         array =  [...deliveries];
         for (let i = 0; i < array.length; i++) {
        
       console.log(array[i]?.interestedBooks?.filter((item) => item.interestedUsersID === currentUser?._id))

      };  
    }
      }
     
a()


    // setInterestedBooks(a());
    console.log(interestedBooks);
  }, [addNote_status]);


  return (
    <div>ספרים שהתעניינתי בהם</div>
  )
}
