import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { getUser, getUserByID, getUsersSlice, sendMassage } from '../../../shared/redux/features/usersSlice'

export default function SendMsg(props) {
    let { register, handleSubmit, formState: { errors } } = useForm();

    const dispatch = useDispatch()
    const toUser = useSelector(getUsersSlice)?.userByID
    const user = useSelector(getUsersSlice)?.currentUser
    const nav = useNavigate()
    const params = useParams()
    const toUserId = params.userId
    const [closeMsgBtn, setCloseMsgBtn] = useState(true)



    const onSub = (_dataBody) => {
        console.log(user);
        let msg = {
            fromUserId: user._id,
            toUserId: toUserId,
            msg: _dataBody.msg
        }
        dispatch(sendMassage(msg))
    }



    useEffect(() => {
        if (user === undefined) {
            toast.info("you need to log in")
            nav("/login")
        }
        dispatch(getUserByID(toUserId))
        dispatch(getUser())

        setTimeout(() => {
            if (toUser?.error)
                toast.error("there is no from property")
        }, 1000);

        console.log(toUser);
        console.log(toUserId);
        console.log(user);
    }, [])

    return (
        <div className={`modal ${closeMsgBtn ? "d-block" : "none"}`}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <button onClick={() => setCloseMsgBtn(!closeMsgBtn)} className="p-3 btn btn-close"></button>
                    <div className="modal-header">
                        <h1 className='display-5 text-center mx-auto'>שליחת הודעה</h1>
                    </div>
                    <div className="modal-body">
                        <div className='border p-2 col-md-6 mx-auto d-block'>
                            <form onSubmit={handleSubmit(onSub)}>
                                <p>שם משתמש: {toUser.name}</p>
                                <label>תוכן הודעה:</label>
                                <input {...register("msg", { required: true })} type="text" className='w-100 form-control' />
                                <div className="modal-footer">
                                    <button className='btn btn-success mt-3'>שלח</button>
                                </div>
                            </form>
                        </div>
                    </div>

                </div>

            </div>


        </div>
    )
}
