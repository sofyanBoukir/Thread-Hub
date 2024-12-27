const express = require("express");
const dbConnect = require("./config/db");

dbConnect()
const server = express();
server.use(express.json())


// using routes
// server.use("api/messages",require("./routes/messageRoutes"));
// server.use("api/notifications",require("./routes/notificationRoutes"));

server.listen(process.env.PORT,() =>{
    console.log("Listenning on PORT 3000");
});