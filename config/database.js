const mongoose = require("mongoose");
require("dotenv").config();
exports.connect = ()=>{
    try{
        mongoose.connect(process.env.DATABASE_URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true
        }).then(()=>
        {console.log("DB connected");}
        )
    }catch(err){
        console.log("DB not connected");
        console.error(err);
        process.exit(1);
    }
}