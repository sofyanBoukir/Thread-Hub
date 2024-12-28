const express = require("express");
const dbConnect = require("./config/db");

dbConnect()
const server = express();
server.use(express.json())


server.use("api/comments",require("./routes/commentRoutes"));
server.use("api/notifications",require("./routes/notificationRoutes"));

server.listen(process.env.PORT,() =>{
    console.log("Listenning on PORT 3000");
});