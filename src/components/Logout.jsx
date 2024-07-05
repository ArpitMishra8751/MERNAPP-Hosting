import React from 'react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { setTaskData, setToken } from '../slices/authSlice';

const Logout = () => {
    const dispatch = useDispatch();
    const navigate= useNavigate();
    useEffect(()=>{
        dispatch(setToken(null));
        dispatch(setTaskData(null));
        localStorage.removeItem("token");
        localStorage.removeItem("taskData");
        localStorage.removeItem("loginData");//update
        navigate("/");
    },[])
  return (
    <div>
      Logout
    </div>
  )
}

export default Logout
