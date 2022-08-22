import React from 'react'
import { useDispatch } from 'react-redux'
import { closeModel } from '../shared/redux/features/modelSlice'



export default function Modal() {
    const dispatch = useDispatch()

    return (
        <div className='modal d-flex align-items-center'>
            <div className=" border mx-auto">
                <div className='modal-body '>
                    <div className="text-center">
                        <h4>אתה בטוח?</h4>
                        <button
                            onClick={() => { dispatch(closeModel()) }}
                            className="btn confirm-btn">
                            אישור
                        </button>
                        <button
                            onClick={() => { dispatch(closeModel()) }}
                            className='btn confirm-btn'>
                            בטל
                        </button>
                    </div>

                </div>

            </div>

        </div>
    )
}
