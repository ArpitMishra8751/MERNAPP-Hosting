const User = require("../models/User");
const Task = require("../models/Task");
const otpGenerator = require("otp-generator");
const OTP = require("../models/OTP");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.forgotpassword=async(req,res)=>{
    try{
        const { email , otp , password , confirmPassword} = req.body;
        if(!email || !otp || !password || !confirmPassword){
            // console.log("All field are required , please fill");
            return res.status(403).send({
                success:false,
                message:"All field are required , please fill"
            })
        }
        if(password !== confirmPassword){
            // console.log("Password is not equal to confirm password");
            return res.status(403).send({
                success:false,
                message:"Password is not equal to confirm password"
            })
        }

        const response1 = await OTP.find({email}).sort({createdAt:-1}).limit(1);

        if(response1.length===0){
            return res.status(403).send({
                success:false,
                message:"OTP not found"
            })
        }

        if(otp !== response1[0].otp){
            return res.status(403).send({
                success:false,
                message:"OTP is Incorrect"
            })
        }
        const encryptedPassword = await bcryptjs.hash(password,10);
        const response = await User.findOneAndUpdate(
            {email:email},
            {
                password:encryptedPassword,
            }
        )
        // console.log("forgot password API Response... ",response);
        return res.status(200).send({
            success:true,
            message:"Password Updated Successfully"
        })
    }
    catch(err){
        // console.log("Some error occured while updating password");
        return res.status(403).send({
            success:false,
            message:"Some error occured while updating password"
        })
    }
}

exports.addtask=async(req,res)=>{
    try{
        const {msg,email} = req.body;
        if(!msg){
            // console.log("msg is empty");
            return res.status(403).send({
                success:false,
                message:"Message is empty"
            })
        }

        const response = await Task.create({
            msg:msg,
            email:email
        });
        const dataFinal = await Task.find({email});
        return res.status(200).send({
            success:true,
            data:dataFinal,
            message:"Task added successfully"
        });
    }
    catch(err){
        // console.log("Some Error occured while adding task... ",err);
        return res.status(403).send({
            success:false,
            message:"Some err occured in ADDTASK API"
        })
    }
}

exports.edittask = async (req,res) =>{
    try{
        const {_id,email,msg} = req.body;
        if(
            !_id ||
            !email
        ){
            return res.status(403).send({
                success:false,
                message:"Id is not given"
            })
        }
        const response1 = await Task.findById(_id);
        if(!response1){
            return res.status(403).send({
                success:false,
                message:"Looks like task doesn't exists"  
            })
        }

        const edittaskres = await Task.findByIdAndUpdate(
            {_id:_id},
            {msg:msg}
        )

        const taskData = await Task.find({email});

        return res.status(200).send({
            success:true,
            data:taskData,
            message:"Task Edited Successfully"
        })
    }
    catch(err){
        // console.log("Some err occured while editing the task... ", err);
        return res.status(403).send({
            success:false,
            message:err.message
        })
    }
}

exports.deltask= async (req,res) => {
    try{
        const {_id,email} =req.body;

        if(
            !_id ||
            !email
        ){
            return res.status(403).send({
                success:false,
                message:"Id is not given"
            })
        }

        const response1 = await Task.findById(_id);

        if(!response1){
            return res.status(403).send({
                success:false,
                message:"Looks like task doesn't exists"  
            })
        }

        await Task.findByIdAndDelete(_id);
        
        const data = await Task.find({email});
        
        return res.status(200).send({
            success:true,
            data:data,
            message:"Task deleted successfully"
        })
    }
    catch(err){
        // console.log("Some err occured while deleting the task..." , err);
        return res.status(403).send({
            success:false,
            message:"Some err occured in ADDTASK API"
        })
    }
}

exports.signup=async(req,res)=>{
    try{
        const {firstName , lastName , email ,password ,confirmPassword,otp} = req.body;
        if(
            !firstName || 
            !lastName ||
            !email ||
            !password || 
            !confirmPassword ||
            !otp
        ){
            // console.log("All fields not found");
            return res.status(403).send({
                success:false,
                message:"All Fields are Required"
            })
        }
        if(password !== confirmPassword) {
            return res.status(403).send({
                success:false,
                message:"Confirm Password not equal to password"
            })
        }
        const existingUser = await User.findOne({email:email});
        if(existingUser) {
            // console.log("User Already exits...");
            return res.status(403).send({
                success:false,
                message:"User Already Exists",
            })
        }

        const response =await OTP.find({email}).sort({createdAt:-1}).limit(1);
        // console.log(response);
        if(response.length === 0) {
            return res.status(400).send({
                success:false,
                message:"The OTP is not found",
            })
        }
        else if(otp !== response[0].otp){
            return res.status(400).send({
                success:false,
                message:"The OTP is not valid",
            })
        }
        const hashedPassword = await bcryptjs.hash(password,10);
        const userRes = await User.create({
            firstName,
            lastName,
            email,
            password:hashedPassword,
        })
        // console.log("User created successfully");
        return res.status(200).send({
            success:true,
            data:userRes,
            message:"User created successfully",
        })
    }
    catch(err){
        // console.log("Some Error Occured while signing in ...",err.message);
        return res.status(500).send({
            success:false,
            message:"User Cannot get Registered , Please try again",
        })
    }
}

exports.sendOTP = async(req,res) =>{
    try{
        const { data } = req.body;
        const email = data.email;
        const firstName = data.firstName;
        console.log("data... ",data);
        console.log("data.email... ",email);
        console.log("data.firstName.. ",firstName);
        
        console.log("first name is ... ",firstName);
        const checkUserPresent = await Task.findOne({ email });
        if(checkUserPresent && (!firstName)) {
            console.log("hii");
            return res.status(401).send({
                success:false,
                message:"User is already registed",
            })
        }
        var otp = otpGenerator.generate(6,{
            upperCaseAlphabets:false,
            lowerCaseAlphabets:false,
            specialChars:false,
        })
        const result = await OTP.findOne({otp:otp});
        while(result){
            otp = otpGenerator.generate(6,{
                upperCaseAlphabets:false
            })
            result = await OTP.findOne({otp:otp});
        }
        const otpPayload = {otp,email};
        const otpBody = await OTP.create(otpPayload);
        // console.log("OTP Body",otpBody);
        return res.status(200).send({
            success:true,
            message:"OTP sent successfully",
        })
    }
    catch(err){
        // console.log("Some error occured" , err.message);
        return res.status(500).send({
            success:false,
            message:"Some error occured while sending otp , Try Again",
            error:err.message,
        })
    }
}

exports.login = async(req,res)=>{
    try{ 
        const {email,password} = req.body;
        const findUser = await User.findOne({email});
        if(!findUser){
            return res.status(401).send({
                success:false,
                message:"User Doesnot exist , Signup",
            }) 
        }
        const check =await bcryptjs.compare(password,findUser.password);
        if(!check){
            return res.status(401).send({
                success:false,
                message:"Password did't match , Try again",
            })
        }
        const token = jwt.sign(
            {email:findUser.email},
            process.env.JWT_SECRET,
            {
                expiresIn:"24h",
            }
        )
        findUser.token=token
        findUser.password=undefined
        const options = {
            expires: new Date(Date.now()+3*24*60*60*1000),
            httpOnly:true,
        }
        const taskdata = await Task.find({email});
        res.cookie("token",token,options).status(200).json({
            success:true,
            data:taskdata,
            token,
            findUser,
            message:"User Login Success",
        })
    }
    catch(err) {
        // console.log("Some error Occured while logging in ...",err.message);
        return res.status(401).json({
            success:false,
            message:err.message,
        })
    }
}
