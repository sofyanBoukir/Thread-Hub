const mongoose = require("mongoose");
require("dotenv").config();

const dbConnect = async () =>{
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log("connected");
        
    }catch(error){
        console.log(error)
    }
}

module.exports = dbConnect