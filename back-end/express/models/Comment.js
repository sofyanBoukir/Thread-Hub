const mongoose = require("mongoose");

const commentShema = new mongoose.Schema({
    posterId : {type:Number, required:true},
    threadId : {type:Number, required:true},
    content : {type:String},
},{timestamps:true});

module.exports = mongoose.model("Comment",commentShema);