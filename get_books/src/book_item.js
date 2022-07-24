import React from 'react'
import { Link } from 'react-router-dom';
import FavBtn from './ticketInfo/favBtn';

export default function ItemTicket(props) {
  let item = props.item;

  const getImg = (_img_url) => {
    if (!_img_url)
      return "https://images.pexels.com/photos/1860618/pexels-photo-1860618.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";
    if (_img_url.includes("://")) {
      return _img_url;
    }
    return "http://localhost:3006" + _img_url;
  }

  return (
    <div className='col-md-3 p-2 ticket-box'>
      <div className='p-2 border shadow h-100'>
        <div className='bg-div' style={{ backgroundImage:`url(${getImg(item.img_url)})`}}></div>
        <h2>{item.name}</h2>
        <h4 className='h5'>Location:{item.location}</h4>
        <div>Date: {item.date_from}</div>
        <div>Price: {item.price} nis</div>
        <FavBtn ticket ={item} />
        <Link  to={"/ticketInfo/" + item._id
        } className='btn btn-info ms-2'>More info</Link>
      </div>
    </div>
  )
}
