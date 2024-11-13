import React from 'react'
import { useDispatch } from 'react-redux'
import { setSignupData } from '../slices/authSlice';
import { sendOTP } from '../services/auth/authAPI';
import { useNavigate } from 'react-router-dom';
import {useForm} from "react-hook-form"

const ForgotPassword = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    function handleForm(data){
        dispatch(setSignupData(data));
        dispatch(sendOTP(data?.email,null,navigate));
    }
    const {register,handleSubmit} = useForm();
  return (
    <div className='flex flex-col justify-center items-center ' >
      <div className='border-2 border-black rounded-lg m-20 p-10 py-12 '> 
      <h1 className='text-4xl mb-3' > Forgot Password </h1>
      <form onSubmit={handleSubmit(handleForm)} >
        <div>
            <label htmlFor='email' >Email</label>
        </div>
        <div>
            <input 
            type="text" 
            placeholder="Enter your Name" 
            className='border-2 border-black text-black rounded-lg hover:bg-orange-900 '
            {...register("email")} /> 
        </div>
        <div>
            <label htmlFor='password'>Enter New Password</label>
        </div>
        <div>    
            <input 
            type="password" 
            placeholder="Enter New Password" 
            className='border-2 border-black text-black rounded-lg hover:bg-orange-900 '
            {...register("password")} /> 
        </div>
        <div>
            <label htmlFor='password'>Confirm New Password</label>
        </div>
        <div>    
            <input 
            type="password" 
            placeholder="Confirm New Password" 
            className='border-2 border-black text-black rounded-lg hover:bg-orange-900 '
            {...register("confirmPassword")} /> 
        </div>
        <div className='flex justify-center items-center w-full '>
            <button className=' text-white border-2 border-black rounded-lg mt-2 w-full hover:bg-orange-900 '>Verify Email</button>
        </div>
      </form>
      </div>
    </div>
  )
}

export default ForgotPassword
