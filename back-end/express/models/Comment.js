const mongoose = require("mongoose");

const commentShema = new mongoose.Schema({
    posterProfile : {type:String, required:true},
    posterUsername : {type:String, required:true},
    threadId : {type:Number, required:true},
    content : {type:String},
},{timestamps:true});

module.exports = mongoose.model("Comment",commentShema);