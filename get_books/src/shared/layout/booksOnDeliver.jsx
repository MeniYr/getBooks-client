import React from "react";

export default function BooksOnDeliver() {
  return (
    <div className="container ">
      <div className="row p-2 d-flex justify-content-center text-center">
        <p className="">בתהליך מסירה</p>
        <div
          style={{
            height: "50px",
          }}
          className="p-2 border border-success my-auto d-flex align-items-center rounded-2"
        >
          <div className="d-flex border justify-content-left px-3">
            <p className=" my-auto">הספר הזה נמסר</p>
            <button className="btn btn-warning badge  my-auto">נמסר</button>
          </div>
        </div>
      </div>
    </div>
  );
}
