const mongoose = require("mongoose");

const messageShema = new mongoose.Schema({
    senderId : {type:Number, required:true},
    receiverId : {type:Number, required:true},
    content : {type:String},
},{timestamps:true});

module.exports = mongoose.model("Message",messageShema);