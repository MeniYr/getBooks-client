import React from 'react'
import { useDispatch } from 'react-redux'
import { closeModel } from '../shared/redux/features/modelSlice'



export default function Model() {
    const dispatch = useDispatch()

    return (
        <aside tabIndex={1} className='model bg-gradient'>
            <div className="model">
                <div className='model-dialog d-flex justify-content-center'>
                    <div className=" ">
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

        </aside>
    )
}
