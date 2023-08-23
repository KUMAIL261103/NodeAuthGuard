const express =require("express");
const router = express.Router();

const {signup,login}= require("../controllers/Auth");
const {auth,isStudent,isAdmin,isTeacher}=require("../middlewares/Authz");
router.post("/login",login);
router.post("/signup",signup);
//protected routed
router.get("/student",auth,isStudent,(req,res)=>{
    res.json({
        success:true,
        message:"Welcome to protected route for student"
    })
});
router.get("/Admin",auth,isAdmin,(req,res)=>{
    res.json({
        success:true,
        message:"Welcome to protected route for Admin"
    })
});
router.get("/teacher",auth,isTeacher,(req,res)=>{
    res.json({
        success:true,
        message:"Welcome to protected route for Teacher"
    })
});
//protected route for testing
router.get("/test",auth,(req,res)=>{
    res.json({
        success:true,
        message:"Welcome to protected route for Testing"
    })
});


module.exports = router;