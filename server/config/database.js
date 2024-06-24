const mongoose = require("mongoose");
require("dotenv").config();
const dbConnect = () =>{
    mongoose.connect(process.env.DATABASE_URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true,
    })
    .then(()=>
        console.log("connected with database successfully")
)
    .catch((err)=>{
        console.log("DB facing connection issues");
        // console.log("err.. ",err);
        process.exit(1);
    })
}
module.exports=dbConnect;