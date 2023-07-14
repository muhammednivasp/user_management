const userModel = require("../Models/userModel")
const jwt = require("jsonwebtoken")
const fs =  require('fs')
const path = require('path')
const adminModel = require("../Models/adminModel")


const maxAge = 3*24*60*60

const createToken =(id)=>{
    return jwt.sign({id},"nivas-brotoype-secret-code",{
        expiresIn:maxAge
    })
}
const handleErrors = (err) => {
    let errors = { email:"", password:"" };
  
    if (err.message === "Incorrect email")
      errors.email = "That email is not registered";
  
    if (err.message === "Incorrect password")
      errors.password = "That password is incorrect"; // Update assignment to errors.password
  
    if (err.code === 11000) {
      errors.email = "Email is already registered";
      return errors;
    }
    if (err.message.includes("Users validation failed")) {
      Object.values(err.errors).forEach(({ properties }) => {
        errors[properties.path] = properties.message;
      });
    }
    return errors;
  };
  
module.exports.register = async(req,res,next)=>{  
 try {
    // console.log(req.body,90);
    const {email,password} = req.body
    const user = await userModel.create({email,password})
    // console.log('po',user);
    const token = createToken(user._id)

    res.cookie("jwt",token,{
    withcredential:true,
    httpOnly:false,
    maxAge:maxAge*1000,
})
res.status(201).json({user:user._id,created: true})
} catch (error) {
    // console.log(error.message);
    const errors = handleErrors(error)
    res.json({errors,created:false})
}}


module.exports.login = async(req,res,next)=>{
    try {
        // console.log(req.body,90);
        const {email,password} = req.body
        const user = await userModel.login(email,password)
        // console.log('po',user);
        const token = createToken(user._id)
    
        res.cookie("jwt",token,{
        withcredential:true,
        httpOnly:false,
        maxAge:maxAge*1000,
    })
    res.status(200).json({user:user,created: true})
    } catch (error) {
        // console.log(error.message);
        const errors = handleErrors(error)
        res.json({errors,created:false})
    }}

    // module.exports.uploadImage = async (req,res,next)=>{
    //   try {
    //     console.log('hai',req.file.filename);
    //     const data = await userModel.findById(req.headers.userid)


    //     if(data.image){
    //       console.log('data . image is here');
          
          
    //     // fs.unlink(path.join(__dirname,'../../public/public/image/',data.image),(err)=>{
    //     //   if(err){
    //     //     console.log(err.message);
    //     //   }else{
    //         console.log('image  delete');
    //         userModel.updateOne({_id:req.headers.userid},{$set:{image:req.file.filename}}).then(async (response)=>{
    //           console.log('updated');
    //           const user = await userModel.findById(req.headers.userid)
    //             console.log('fdd');
    //             res.json({user})
  
        
    //         })
    //       // }
    //     // })
    //   }else{
    //     console.log('yyugy');
    //     userModel.updateOne({_id:req.headers.userid},{$set:{image:req.file.filename}}).then(async (response)=>{
    //       console.log('updated');
    //       const user = await userModel.findById(req.headers.userid)
    //         console.log('fdd');
    //         res.json({user})
    //       })
      
    //   } 
    
    // }catch (error) {
        
    //   }
    // }

    module.exports.uploadImage = async (req, res, next) => {
      try {
  
          const userId = req.headers.userid
          console.log(userId+"lop");
          const imageUrl = req.file.filename
          const data = await userModel.findOne({_id: userId })
          console.log(data+"fdfe")
  
          if(data.image !== undefined) {
              fs.unlink(path.join(__dirname, "/jwt/public/public/image", data.image), (err) => {
                  if (err) {
                      console.log(err)
                  } else {
                      console.log("image deleted")
                  }
              })
          }
  console.log('jhjh');
          const userData = await userModel.findOneAndUpdate({ _id: userId }, { $set: { image: imageUrl }},{new:true} )

          // console.log(image)
          const user = await userModel.findOne({ _id: userId })

          res.status(201).json({ user})
  
  
      } catch (err) {
          // console.log(err)
          // const errors = handleErrors(err)
          // res.json({ errors})
      }
  }


//admin


 module.exports.adminLogin = async (req,res,next)=>{
    try {
        const {email,password} = req.body
        const admin = await adminModel.findOne({email:email})
        if(admin == null){
            res.json({message:"Incorrect email"})
        }else{
            console.log("ethiyo");
            if(admin.password === password){
                const token = createToken(admin._id)
                res.cookie("adminjwt",token,{
                    withcredential:true,
                    httpOnly:false,
                    maxAge:maxAge*1000,
                })
                res.status(200).json({adminId:admin._id})
            }else{
                console.log("password is wrong");
                res.json({messag:"Incorrect password"})
            }
        }
    } catch (error) {
        console.log(error);
    }
 }
  
 module.exports.getAllUsers = async (req,res,next)=>{
     try {
        const allUser = await userModel.find({})
        console.log(allUser+"jjjj");
        res.status(200).json({data:allUser})
     } catch (error) {
        console.log(error);
     }
 }

 module.exports.deleteUser = async(req,res,next) =>{
    try {
        const userId = req.params.id
        await userModel.deleteOne({_id:userId}).then(()=>{
            res.status(200).json({deleted:true})
        })
    } catch (error) {
        console.log(error);
    }
 }
 module.exports.editUser = async(req,res,next)=>{
    try {
        const {id,email} = req.body
        // console.log(req.body);
        await userModel.updateOne({_id:id},{$set:{email:email}})
        res.status(200).json({updated:true})
    } catch (error) {
       console.log(error); 
    }
 }
    

