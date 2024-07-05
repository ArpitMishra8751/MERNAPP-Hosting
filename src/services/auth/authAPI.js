import {apiConnector} from "../apiConnector"
import {endpoints} from "../apis"
import { toast } from "react-hot-toast"
import { setSignupData, setTaskData,setToken } from "../../slices/authSlice"

const {
    SENDOTP_API,
    SIGNUP_API,
    LOGIN_API,
    ADDTASK_API,
    DELTASK_API,
    EDITTASK_API,
    FORGOTPASSWORD_API
} = endpoints

export function forgotPassword(email,password,confirmPassword,otp,navigate){
    return async(dispatch)=>{
        const toastId = toast.loading("loading... ");
        try{
            const response = await apiConnector(
                "PUT",
                FORGOTPASSWORD_API,
                {
                    email,
                    password,
                    confirmPassword,
                    otp
                }
            )
            // console.log("Forgot Password API response... ",response);
            if(!response.data.success){
                // console.log(response.data.message);
                throw new Error(response.data.success);
            }
            toast.success(response.data.message);
            navigate("/login");
        }
        catch(err){
            // console.log("console ",err?.response?.data?.message);
            // console.log("Forgot Password API ERROR... ",err);
            toast.error(err?.response?.data?.message);
        }
        toast.dismiss(toastId);
    }
}

export function deltask(_id,email){
    return async(dispatch)=>{
        const toastId = toast.loading("loading... ");
        try{
            const response = await apiConnector(
                "DELETE",
                DELTASK_API,
                {
                    _id,
                    email
                }
            )
            if(!response.data.success){
                // console.log("Some error occured while del task...",response.data.message);
                throw new Error(response.data.message);
            }
            dispatch(setTaskData(response.data.data));
            toast.success("Task Deleted Successfully.");
        }
        catch(err){
            // console.log("Some error occured while deleting task... ",err);
        }
        toast.dismiss(toastId);
    }
}

export function edittask(_id,email,msg) {
    return async(dispatch)=>{
        const toastId = toast.loading("loading... ");
        try{
            const response = await apiConnector(
                "PUT",
                EDITTASK_API,
                {
                    _id,
                    email,
                    msg
                }
            )
            // console.log("EDIT TASK API RESPONSE... ",response);
            if(!response.data.success){
                // console.log("Some error has been occured while editing task ... ",response.data.message);
                throw new Error(response.data.message);
            }
            dispatch(setTaskData(response.data.data));
            toast.success("Task Edited Successfully");
        }
        catch(err){
            // console.log("Some error occured while editing the task... ",err);
        }
        toast.dismiss(toastId);
    }
}

export function sendOTP(email,navigate){
    return async(dispatch)=>{
        const toastId = toast.loading("loading... ")
        try{
            const response = await apiConnector(
                "POST",
                SENDOTP_API,
                {
                    email
                }
            )
            if(!response.data.success) {
                // console.log("some error occured while sending OTP... ",response.data.message);
                throw new Error(response.data.message);
            }
            toast.success("OTP sent successfully");
            navigate("/verify-email");
        }
        catch(err){
                // console.log("console ",err?.response?.data?.message);
                // console.log("SEND_OTP API error....",err);
                toast.error(err?.response?.data?.message);
                // navigate("/");
        }
        toast.dismiss(toastId);
    }
}

export function signUp(
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    otp,
    navigate,
    ){
        return async ()=>{
        const toastId = toast.loading("loading... ");
            try{
                const response = await apiConnector(
                    "POST",
                    SIGNUP_API,
                    {
                       firstName,
                       lastName,
                       email,
                       password,
                       confirmPassword,
                       otp,
                    }
                )
                // console.log("response ",response);
                if(!response.data.success){
                    toast.error(response.data.message);
                    // console.log("Some error occured... ",response.data.message);
                    throw new Error(response.data.message)
                }
                // console.log("Signup Successful");
                toast.success(response?.data?.message);
                // toast.success("Signup Successful");
                navigate("/login");
            }
            catch(err){
                // console.log("console ",err?.response?.data?.message);
                // console.log("Signup API error....",err);
                toast.error(err?.response?.data?.message);
                // navigate("/");
            }
            toast.dismiss(toastId);
        }
}

export function addtask(msg,email){
    return async(dispatch)=>{
        const toastId = toast.loading("loading... ");
        try{
            const response = await apiConnector(
                "POST",
                ADDTASK_API,
                {
                    msg,
                    email,
                }
            )
            // console.log("ADDTask API Response.... ",response);
            if(!response.data.success){
                toast.error(response.data.message);
                throw new Error(response.data.message);
            }
            dispatch(setTaskData(response.data.data));
            toast.success("Task Added Successfully");
        }
        catch(err){
            // console.log("console ",err?.response?.data?.message);
            // console.log("ADDTASK API ERROR............", err);
            toast.error(err?.response?.data?.message);
        }
        toast.dismiss(toastId);
    }
}

export function login(email,password,navigate){
    return async(dispatch)=>{
        const toastId = toast.loading("loading... ");
        try{
            const response = await apiConnector(
                "POST",
                LOGIN_API,
                {
                    email,
                    password
                }
            )
            // console.log("LOGIN_API response... ",response);
            if(!response.data.success){
                toast.error(response.data.message);
                // console.log("Some error occured... ",response.data.message);
                throw new Error(response.data.message);
            }
            toast.success("LOGIN successful");
            dispatch(setToken(response.data.token));
            dispatch(setSignupData(response.data.findUser));
            dispatch(setTaskData(response.data.data));
            localStorage.setItem("token",JSON.stringify(response.data.token));
            localStorage.setItem("loginData",JSON.stringify(response.data.findUser)); //update
            console.log("JSON stringify findUser ",JSON.stringify(response.data.findUser));
            navigate("/home");
        }
        catch(err) {
            // console.log("console ",err?.response?.data?.message);
            // console.log("LOGIN API ERROR............", err);
            toast.error(err?.response?.data?.message);
        }
        toast.dismiss(toastId);
    }
}
