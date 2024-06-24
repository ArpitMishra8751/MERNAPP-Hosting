import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { forgotPassword, sendOTP, signUp } from '../services/auth/authAPI';
import OtpInput from 'react-otp-input';
const VerifyEmail = () => {
  const [otp,setOtp] = useState("");
  const {signUpData} = useSelector((state)=> state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(()=>{
    if(!signUpData){
      navigate("/");
    }
  }
  ,[signUpData]);
  
  function handleVerifyAndSignup(e){
    e.preventDefault();
    if(signUpData.firstName){
      dispatch(signUp(
        signUpData.firstName,
        signUpData.lastName,
        signUpData.email,
        signUpData.password,
        signUpData.confirmPassword,
        otp,
        navigate
      ))
    }
    else{
      dispatch(forgotPassword(
        signUpData.email,
        signUpData.password,
        signUpData.confirmPassword,
        otp,
        navigate
      ))
    }
  }
  return (
    <div className='flex flex-col justify-center items-center text-black ' >
      <div className='border-2 border-black rounded-lg m-20 p-10 px-12' > 
      <h1 className='text-4xl mb-3 text-white ' >Verify Email</h1>
      <form onSubmit={handleVerifyAndSignup} >
        <OtpInput
        className='border-2  border-black text-black rounded-lg '
        value={otp}
        onChange={setOtp}
        numInputs={6}
        renderInput={(props) => (
          <input
            className=" text-black"
            {...props}
            placeholder="-"
          />
        )} />
         <div className='flex justify-center items-center w-full mt-2'>
         <button className=' text-white border-2 border-black rounded-lg mt-2 w-full hover:bg-orange-900' type="submit">
          Verify Email
        </button>
        </div>
        </form>
        <div className='flex justify-center items-center  '>
          <button className=' text-white border-2 border-black rounded-lg mt-2 w-full hover:bg-orange-900' 
              onClick={() => dispatch(sendOTP(signUpData.email,navigate))}>
              Resend it
          </button>
        </div>
        </div>
    </div>
  )
}

export default VerifyEmail