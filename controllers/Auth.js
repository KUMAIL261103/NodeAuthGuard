const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user");
exports.signup = async(req,res)=>{
    try{
    const {name,email,password,role}= req.body;
    const existingUser = await userModel.findOne({email});
    if(existingUser){
        return res.status(400).json({
            success:false,
            message:"USER ALREADY EXIST",
        })
    }
    let hashPassword ;
    try{
        hashPassword = await bcrypt.hash(password,10);
    }
    catch(err){
        return res.status(500).json({
            success:false,
            message :"ERROR IN HASHING PASSWORD",
        })
    }
    const Hasheduser = await userModel.create(
        {
            name,email,password:hashPassword,role
        }
    )
     return res.status(200).json({
        success:true,
        messsage:"User created successfully",
     })
}
catch(err){
    console.error(err);
    console.log(" Inrternal Server error");
    return res.status(500).json({
    success:false,
    message:"User cannot be registered ,Please try again later"
    })

}
}



exports.login = async(req,res)=>{
    try{
    const {email,password} = req.body;
    if(!email || !password){
        return res.status(400).json({
            success:false,
            message:"Not sufficient credentials"
        })
    }
    let newuser = await userModel.findOne({email});
    if(!newuser){
        return res.status(401).json({
            success:false,
            message:"No User found of current email, please check email or signup",
        })
    }
    const payload= {
        email:newuser.email,
        password:newuser.password,
        role:newuser.role,
        id: newuser._id,
    }
    if(await bcrypt.compare(password,newuser.password)){
        let token = jwt.sign(
                            payload,
                            process.env.JWT_SECRET,
                            {
                                expiresIn:"2h",
                            });
       
        newuser.token= token;
        newuser.password=undefined;
        const options = {
            expires:new Date(Date.now() + 3*24*60*60*1000),
            httpOnly:true,
        }
        res.cookie("token",token,options).status(200).json(
            {
                success:true,
                token,
                newuser,
                message:"User login successfully",
            }
        )               
        
        
        }else{
        return res.status(403).json({
            success:false,
            message:"Password correct",
        })
    }

}
catch(err){
    console.log(err);
    return res.status(500).json({
        success:false,
        error:err.message,
        message:"Login Failure"

    })

    
}
}