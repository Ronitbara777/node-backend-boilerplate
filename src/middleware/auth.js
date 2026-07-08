const jwt=require("jsonwebtoken")
const User=require("../model/User")

const protect= async(req,res,next)=>{
    try{
        if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        const token=req.headers.authorization.split(" ")[1]
        if(!token){
            return res.status(401).json({message:"Not authorized , no token"})
        }
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        req.user=await User.findById(decoded.id).select("-password")
        next()}
        else{
            return res.status(401).json({message:"not authorized , no token"})
        }
    }catch(error){
        console.error(error)
        res.status(401).json({message:"not authorized"})
    }
}

module.exports=protect;