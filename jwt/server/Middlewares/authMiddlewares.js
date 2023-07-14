const User = require("../Models/userModel")
const Admin = require("../Models/adminModel")

const jwt = require("jsonwebtoken");
const adminModel = require("../Models/adminModel");

module.exports.checkUser = (req,res,next)=>{
    const token = req.cookies.jwt;
    if(token){
        jwt.verify(token,"nivas-brotoype-secret-code",async(err,decodedToken)=>{
            if(err){
                res.json({status:false})
                next()
            }else{
                // console.log(decodedToken);
                const user = await User.findById(decodedToken.id)
                if(user) res.json({status:true,user:user.email})
                else res.json({status:false})
                next();
            }
        })
    }else{
        res.json({status:false})
        next();
    }
}

module.exports.checkAdmin = (req,res,next) =>{
    const token = req.cookies.adminjwt
    console.log(token,900);
    if(token){
        jwt.verify(token, "nivas-brotoype-secret-code", async (err,decodedToken)=>{
            if(err){
                res.json({status:false})
                next()
            }else{
                const admin = await adminModel.findById(decodedToken.id)
                console.log(admin+"popopopop");
                if(admin) res.json({status:true,admin:admin._id})
                else res.json({staus:false})
                next()
            }
        })
    }else{
        res.json({status:false})
        next()
    }
}