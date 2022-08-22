import React, { useEffect } from 'react'
import { useState } from 'react'
import SendMsg from './userStorey/sendMsg'

export default function Delivery({ toOpenModal, note }) {
    const [openMsg, setOpenMsg] = useState(false)
    useEffect(() => {

    }, [])

    return (
        <div class="modal d-block" tabindex="-1">
            <div class="modal-dialog ">
                <div class="modal-content d-flex justify-content-center">
                    <button type="button" class="btn-close me-auto ps-2 pt-2" data-bs-dismiss="modal" aria-label="Close"></button>
                    <div class="modal-header mx-auto">
                        <h5 class="modal-title">מסירת ספר - {note.bookID.name}</h5>
                    </div>
                    <div class="modal-body ">
                        <div className=' d-md-flex p-2 '>
                            <div className='p-2 '>
                                <img src={note.bookID.image}
                                    className='shadow rounded-1'
                                    alt="book pic"
                                    width={109}
                                    height={171}
                                />
                            </div>
                            <div className='text-wrap p-2'>{note.bookID.description.length>200? note.bookID.description.substring(0,200)+"..." :note.bookID.description}</div>
                        </div>
                        <hr />
                    
                            <h4 className='pt-3 '> {note.fromUserId.name}</h4>
                        <div className='d-md-flex'>
                            {(note.fromUserId.isShareMail===true || note.fromUserId.isSharePhone===true ) && <h4>פרטי המוסר:</h4>}
                            <div>
                               <button onClick={()=>{setOpenMsg(true)}}>שלח הודעה</button>
                               {openMsg&&<SendMsg msgClose={setOpenMsg} id={note.fromUserId._id} />}
                            </div>
                            <div>

                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button onClick={() => toOpenModal(false)} type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary">Save changes</button>
                    </div>
                </div>
            </div>
        </div>

    )
}
