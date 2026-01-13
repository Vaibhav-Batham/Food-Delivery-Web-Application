 import user from "../models/user.model.js"
 import bcrypt from "bcryptjs"
 import genToken from "../utiles/token.js"
 export const signUp=async (req,res) => {
    try{
        const {fullName,email,password,mobile,role}=req.body
        const user=await user.findone({email})
        if(user){
            return res.status(400).json({message:"User already exist."})
        }
        if(password.lenght<6){
            return res.status(400).json({message:"mobile number must be at least 10 digits."})
        }
        const hashedPassword=await bcrypt.hash(password,10)
        user=await user.create({
            fullName,
            email,
            role,
            mobile,
            password:hashedPassword
        })
           const token = await genToken(user._id);

res.cookie("token", token, {
  httpOnly: true,
  secure: false,
  sameSite: "strict",
  maxAge: 7 * 24 * 60 * 60 * 1000
});


        

        return res.status(201).jason(user)


    } catch (error){
                return res.status(500).jaso(`sign up error ${error}`)

    }
 }


 export const signIn=async (req,res) => {
    try{
        const {email,password}=req.body
        const user=await user.findone({email})
        if(!user){
            return res.status(400).json({message:"User does not exist."})
        }
      const isMatch=await bcrypt.compare(password,user.password) 
      if(!isMatch) {
        return res.status(400).json({message:"incorrect Password"})

      }
         const token = await genToken(user._id);

res.cookie("token", token, {
  httpOnly: true,
  secure: false,
  sameSite: "strict",
  maxAge: 7 * 24 * 60 * 60 * 1000
});

return res.status(200).json(user)




    } catch (error){
                return res.status(500).jaso(`sign in  error ${error}`)

    }
 }


 export const signOut=async(req,res) => {
    try {
        res.clearCookie("token")
        return res.status(200).json({message:"log out successfully"})
    } catch(error){
        return res.status(500).json(`sign out error ${error}`)
    }
 }