const mongoose = require("mongoose");

const notificationShema = new mongoose.Schema({
    notificationType:{type:String, enum:["communityInvitation","like","comment"]},
    notificationContent : {type:String},
    posterUsername : {type:String},
    posterProfile : {type:String},
    receiverId : {type:Number},
    communityId : {type:Number},
    threadId : {type:Number},
},{timestamps:true});

module.exports = mongoose.model("Notification",notificationShema);