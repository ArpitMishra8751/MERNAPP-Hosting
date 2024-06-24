import React from 'react'
import { useForm } from "react-hook-form"
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/auth/authAPI';
const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {register,handleSubmit} = useForm();
    const handleForm = (data) => {
      dispatch(login(data.email,data.password,navigate));
      // console.log(data);
      
    };
    function forgotPassword(){
      // console.log("forgot password");
      navigate("/forgotpassword");
    }
  return (
    <div className='flex flex-col justify-center items-center ' >
      <div className='border-2 border-black rounded-lg m-20 p-10 px-15 ' > 
      <h1 className='text-4xl mb-3' >Log In </h1>
      <form onSubmit={handleSubmit(handleForm)} >
        <div>
            <label htmlFor='email' >Email</label>
        </div>
        <div>
            <input 
            type="text" 
            placeholder="Enter your Email" 
            className='border-2 border-black text-black rounded-lg hover:bg-orange-900'
            {...register("email")} /> 
        </div>
        <div>
            <label htmlFor='password'>Enter Password</label>
        </div>
        <div>    
            <input 
            type="password"
            placeholder="Enter Password" 
            className='border-2 border-black text-black rounded-lg hover:bg-orange-900 '
            {...register("password")} /> 
        </div>
        <div className='flex justify-center items-center w-full '>
            <button className=' text-white border-2 border-black rounded-lg mt-2 w-full hover:bg-orange-900'>Submit</button>
        </div>
      </form>
      <div className='flex justify-center items-center mt-2' >
      <button className=' hover:text-blue-900  ' onClick={ () =>  forgotPassword() } >Forgot Password </button>
      </div>
      </div>
    </div>
  )
}
export default Login