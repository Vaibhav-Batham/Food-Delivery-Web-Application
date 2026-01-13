 import express from "express"
 import { signIn,signOut,signUp } from "../controlers/auth.controlers.js"
 const authRouter=express.Router()
 

 authRouter.post("/signup",signUp)
 authRouter.post("/signin",signIn) 
 authRouter.post("/signout",signOut)

 export default authRouter