import React from 'react'
import {useForm} from "react-hook-form"
import { sendOTP } from "../services/auth/authAPI"
import { useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { setSignupData } from '../slices/authSlice'
const Signup = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {register,handleSubmit} = useForm();
    const handleForm = (data) =>{
        dispatch(setSignupData(data));
        dispatch(sendOTP(data.email,navigate));
        // console.log(data);
    }
  return (
    <div className='flex flex-col justify-center items-center ' >
      <div className='border-2 border-black rounded-lg m-20 p-10 ' > 
      <h1 className='text-4xl mb-3' >Register</h1>
      <form onSubmit={handleSubmit(handleForm)} >
        
        <div>
            <label htmlFor='firstName'>First Name</label>
        </div>
        <div className=' w-40 ' >
            <input 
            type="text"
            placeholder="Enter First Name" 
            className='border-2 border-black text-black rounded-lg hover:bg-orange-900 '
            {...register("firstName")} />
        </div>
        <div>
            <label htmlFor='lastName'>Last Name</label>
        </div>
        <div>
            <input 
            type="text"
            placeholder="Enter last Name" 
            className='border-2 border-black text-black rounded-lg hover:bg-orange-900 '
            {...register("lastName")} />
        </div>
        <div>
            <label htmlFor='email' >Email</label>
        </div>
        <div>
            <input
            type="text" 
            placeholder="Enter Email" 
            className='border-2 border-black text-black rounded-lg hover:bg-orange-900 '
            {...register("email")} /> 
        </div>
        <div>
            <label htmlFor='password' >Password</label>
        </div>
        <div>
            <input 
            type="password" 
            placeholder="Enter Password" 
            className='border-2 border-black text-black rounded-lg hover:bg-orange-900 '
            {...register("password")} />
        </div>
        <div>
            <label htmlFor='confirmPassword' >Confirm Password</label>
        </div>
        <div>
            <input
            type="password"
            placeholder="Confirm Password" 
            className='border-2 border-black text-black rounded-lg hover:bg-orange-900 '
            {...register("confirmPassword")}/>
        </div>
        <div className='flex justify-center items-center w-full '>
            <button className=' text-white border-2 border-black rounded-lg mt-2 w-full hover:bg-orange-900 ' >Submit</button>    
        </div> 
        
      </form>
      <Link to="/login" className=' hover:text-blue-900 ' >Already Registered,Login</Link>
      </div>
    </div>
  )
}
export default Signup
