const mongoose = require("mongoose");

const notificationShema = new mongoose.Schema({
    notificationType:{type:String, enum:["communityInvitation","like","comment"]},
    notificationContent : {type:String},
    senderId : {type:Number, required:true},
    receiverId : {type:Number, required:true},
    communityId : {type:Number},
    threadId : {type:Number},
},{timestamps:true});

module.exports = mongoose.model("Notification",notificationShema);