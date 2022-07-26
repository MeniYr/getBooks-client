import React, { useContext } from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
// import { ClientContext } from '../../context/clientContext';
import { API_URL, doApiMethod, TOKEN_NAME } from '../../services/apiService';

export default function Login() {
  // const {setUser,doApiUserInfo} = useContext(ClientContext)

  const nav = useNavigate();
  let { register, handleSubmit, formState: { errors } } = useForm();

  const onSub = (_dataBody) => {
    console.log(_dataBody);
    doApi(_dataBody);

  }

  const doApi = async (_dataBody) => {
    let url = API_URL + "/users/login";
    try {
      let resp = await doApiMethod(url, "POST", _dataBody);
      if (resp.data.token) {
        console.log(resp.data.token);
        console.log(resp.data.user);
    
        toast.success(`Welcome ${resp.data.user.name}, You logged in`);
        //save token
        localStorage.setItem(TOKEN_NAME, resp.data.token);
        // TODO: update global store via context
        // setUser(resp.data.user);
        // doApiUserInfo();
        // nav("/");
        // TODO save token
      }
      else{
        toast.error("There is problem come back later");
        
      }
    }
    catch(err){
      toast.error("User or password worng or there is problem come back later");
    }
  }

  return (
    <div className='container'>
      <h1 className='display-5 text-center'>Log in</h1>
      <form onSubmit={handleSubmit(onSub)} className='col-md-6 mx-auto'>
   
        <label> Email</label>
        <input  {...register("email", { required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i })} type="email" className='form-control' />
        {errors.email && <small className='d-block text-danger'>
          Enter valid Email
        </small>}
        <label>password</label>
        <input  {...register("password", { required: true, minLength: 3 })} type="password" className='form-control' />
        {errors.password && <small className='d-block text-danger'>
          Enter valid password (min 3 chars)
        </small>}
     
        <button className='btn btn-success mt-3'>Log in</button>
      </form>
    </div>
  )
}
