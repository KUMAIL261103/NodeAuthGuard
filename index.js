const express = require("express");
const cookieParser = require("cookie-parser");
const userroutes = require("./routes/user");
const app  = express();
require("dotenv").config();
const PORT = process.env.PORT || 4000;
app.use(express.json());
app.use(cookieParser());
app.use("/",userroutes);
app.listen(PORT,()=>{
    console.log(`Server established at ${PORT}`);
})
require("./config/database").connect();