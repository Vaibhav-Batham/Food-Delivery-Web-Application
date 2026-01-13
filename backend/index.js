 import express from "express"
 import connectDB from "./config/db.js";
 import cookieParser from "cookie-parser";
 import dotenv  from "dotenv"
 //import connectDb from "./config/db.js"
 import authRouter from "./routes/auth.route.js"
 import cors from "cors"
 dotenv.config()
 const app=express()
 const port=process.env.port|| 5000
 app.use(cors({
   origin:"http://localhost:5173",
   credentials:true
 }))
 app.use(express.json())
 app.use(cookieParser())
 app.use("/api/auth",authRouter)

 app.listen(port,()=>{
    connectDB();
    console.log(`server started at ${port}`)


 })