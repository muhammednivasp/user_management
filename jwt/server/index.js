const express = require('express')
const cors = require('cors')
const app = express()
const mongoose = require('mongoose')
const authRoutes = require('./Routes/AuthRoutes')
const cookieparser = require('cookie-parser')
require("dotenv").config()

app.listen(PORT,()=>{
    console.log(`server started on port ${PORT}`);
})

mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log("DB Connection successfull");
}).catch((err)=>{
    console.log(err.message);
})

app.use(
    cors({
        origin:["http://localhost:3000"],
        method:["GET","POST","DELETE"],
        credentials:true,
    })
)

app.use(cookieparser())
app.use(express.json())
app.use("/",authRoutes)