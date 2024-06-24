const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");

const OTPSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
    },
    otp:{
        type:String,
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now,
        expires:5*60*1000,
    }
})

async function sendVerificationEmail(email,otp){
    try{
        const mailResponse = await mailSender(
            email,
            "Verification Mail",
            `OTP for the verification of Email account ${otp}`
        );
        // console.log("Email sent successfully" , mailResponse);
    }
    catch(err){
		// console.log("Error occurred while sending email: ", err);
		throw err;
    }
}

OTPSchema.pre("save",async function(next){
    if(this.isNew){
        // console.log("checking ",this.email,this.otp);
        await sendVerificationEmail(this.email,this.otp);
    }
    next();
})

const OTP = mongoose.model("OTP",OTPSchema);
module.exports = OTP;