import React from 'react'
import myStyle from "../../componets/layoutCss.module.css"
export default function Footer() {
  return (
    <div className='container-fluid shadow'>
      <div style={{
        backgroundColor:"#1976d2"
      }} className='d-flex rounded-2 border border-black justify-content-center align-items-md-center  px-3'>
<div>
  <p className={` my-auto py-3 h-100 text-white fs-5 fw-semibold initialism text opacity-75 ${myStyle.footer} `}>®️ meni rotblat - 2022</p>
</div>
      </div>
    </div>
  )
}
