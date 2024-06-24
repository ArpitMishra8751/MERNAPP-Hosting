const express = require("express");
const app=express();
const userRoutes = require("./routes/path");
var cors = require("cors");
const dbConnect = require("./config/database");
app.use(express.json());
require("dotenv").config();
app.use(
    cors({
        origin:"*",
    })
);
app.use("/api/v1",userRoutes);
const PORT = process.env.PORT || 4000;

app.listen(PORT,()=>{ 
    console.log(`App is listening at port No:- ${PORT}`);
});

dbConnect();
app.get("/",(req,res)=>{
    res.send( '<h1>This is the Homepage</h1>');
});
