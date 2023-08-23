const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = (req,res,next)=>{
    try{
        //extract jwt token
        const token = req.body.token || req.cookie.token || req.header("Authorization").replace("Bearer ","");
        if(!token){
            return res.status(401).json({
                success:false,
                message:"token is not present"
            })
        }
        //verify the token
        try{
            const decode = jwt.verify(token,process.env.JWT_SECRET);
            req.user = decode;
        }catch(error){
            return res.status(401).json({
                success:false,
                message:"token is not valid"
            })
        }
        next();
    }catch(error){
        return res.status(401).json({
            success:false,
            message:"something went wrrong in verying tokens"
        })

    }
}
exports.isStudent = (req,res,next)=>{
    try{
        if(req.user.role !=="Student"){
            return res.status(401).json({
                success:false,
                message:"This is protected route for students only"
            })
        }
        next();
    }catch(error){
        res.status(500).json({
            success:false,
            message:"userrole is not matching"
        })
    }
}
exports.isTeacher = (req,res,next)=>{
    try{
        if(req.user.role !=="Teacher"){
            return res.status(401).json({
                success:false,
                message:"This is protected route for teacher only"
            })
        }
        next();
    }catch(error){
        res.status(500).json({
            success:false,
            message:"userrole is not matching"
        })
    }
}
exports.isAdmin = (req,res,next)=>{
    try{
        if(req.user.role !=="Admin"){
            return res.status(401).json({
                success:false,
                message:"This is protected route for Admin only"
            })
        }
        next();
    }catch(error){
        res.status(500).json({
            success:false,
            message:"userrole is not matching"
        })
    }
}