 import user from "../models/user.model"
 import bcrypt from "bcryptjs"
 const signUp=async (req,res) => {
    try{
        const {fullName,email,password,mobile,role}=req.body
        const user=await User.findone({email})
        if(user){
            return res.status(400).json({message:"User already exist."})
        }
        if(password.lenght<6){
            return res.status(400).json({message:"mobile number must be at least 10 digits."})
        }
        const hashedPassword=await bcrypt.hash(password,10)
        user=await User.create({
            fullName,
            email,
            role,
            mobile,
            password:hashedPassword
        })





    } catch (error){

    }
 }