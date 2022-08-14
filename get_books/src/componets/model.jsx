import React from 'react'
import { useDispatch } from 'react-redux'
import { closeModel } from '../shared/redux/features/modelSlice'



export default function Model() {
    const dispatch = useDispatch()

    return (
        <aside className='model-container bg-gradient'>
            <div className="model">
                <div className="btn container">
                    <h4>Are you sure?</h4>
                    <button 
                    onClick={()=>{dispatch(closeModel())}}
                    className="btn confirm-btn">
                        אישור
                    </button>
                    <button 
                     onClick={()=>{dispatch(closeModel())}}
                    className='btn clear-btn'>
                        בטל
                    </button>
                </div>

            </div>

        </aside>
    )
}
