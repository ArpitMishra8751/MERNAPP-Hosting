const mongoose = require("mongoose");
const taskSchema = new mongoose.Schema({
    msg:{
        type:"string",
        required:true,
    },
    email:{
        type:"string",
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now,
    }
});
module.exports = mongoose.model("task",taskSchema);