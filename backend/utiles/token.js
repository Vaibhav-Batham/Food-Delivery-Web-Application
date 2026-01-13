 const gentoken=async (userId) => {
    try {
        const token=await jwt.sign({userId},Process.env.JWT_SECRET,{expiresIn:"7d"})
        return token
    } catch (error){
        console.log(error)
    }
 }


 export default gentoken;