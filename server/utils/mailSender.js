const nodemailer = require("nodemailer");
// require("dotenv").config();
const mailSender = async(email,title,body)=>{
    try{
        let transporter = nodemailer.createTransport({
            host:process.env.MAIL_HOST,
            // service:"gmail",
            // host:"smtp.ethereal.email",
            // port:587,
            // secure:false,
            auth:{
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASS,
            },
        });
        console.log("info.. ",process.env.MAIL_HOST,process.env.MAIL_USER,process.env.MAIL_PASS);
        console.log("info2.. ",email,title,body);
        var mailOptions = {
            from: 'Ekart-App by Arpit',
            to:`${email}`,
            subject:`${title}`,
            html:`${body}`,
        };
        let info = await transporter.sendMail(mailOptions,function(error,info){
            if(error){
                console.log("some err occured... ",error);
            }
            else{
                console.log("email send successfully");
            }
        })
        console.log( "information.. " ,info);
        return info;
    }
    catch(err){
        console.log("Some error occuring while sending email ... ",err);
        console.log("message.. ",err.message);
    }
}

module.exports = mailSender;
