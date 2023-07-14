const {register, login,uploadImage, adminLogin,getAllUsers,deleteUser,editUser} = require("../Controllers/AuthControllers")
const { checkUser,checkAdmin } = require("../Middlewares/authMiddlewares")
const { uploadOptions } = require("../Middlewares/multer")

const router = require('express').Router()

//user

router.post("/",checkUser)
router.post("/register",register)
router.post("/login",login)
router.post("/upload-image",checkUser?uploadOptions.single('image'):login,checkUser?uploadImage:login)

//admin

router.post("/adminlogin",adminLogin)
router.post('/admin', checkAdmin)
router.get('/getallusers',getAllUsers)
router.post('/deleteuser/:id',deleteUser)
router.post('/adminadduser',register)
router.post('/edituser',editUser)







module.exports = router
