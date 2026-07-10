const User=require("../model/User.js")
const {generateAccessToken,generateRefreshToken}=require("../utils/generateToken.js");
const jwt=require('jsonwebtoken');

const register=async (req,res,next)=>{
    try{
        const {name,email,password}=req.body;
        const userExists=await User.findOne({email});
        if(userExists){
            return res.status(400).json({message:"user already exists"})
        }
        const user = await User.create({
            name,
            email,
            password
        });
        res.cookie('refresh',generateRefreshToken(user._id), {
            httpOnly: true,
            secure: process.env.NODE_ENV!=="development",
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });
        res.status(201).json({message:"Registration successful",token:generateAccessToken(user._id)});
    }catch(err){
        console.log(err)
        next(err)
    }
}

const login=async (req,res,next)=>{
    try{
        const {email, password}=req.body;
        const user= await User.findOne({email});
        if(user && (await user.matchPassword(password))){ 
            res.cookie('refresh',generateRefreshToken(user._id), {
                httpOnly: true,
                secure: process.env.NODE_ENV!=="development",
                sameSite: 'strict',
                maxAge: 7 * 24 * 60 * 60 * 1000
            });
            res.status(200).json({msg:"Login succesfull",user:{name:user.name,email:user.email},token:generateAccessToken(user._id)})
        }else{
            res.status(401).json({msg:"invalid email or password"})
        }
    }catch(err){
        console.log(err);
        next(err)
    }
}
const refreshToken=async (req,res,next)=>{
    try{
        const token=req.cookies.refresh;
        if(!token){
            return res.status(401).json({message:"Not authorized, no refresh token"});
        }
        const decoded=jwt.verify(token,process.env.JWT_REFRESH_SECRET);
        const newAccessToken=generateAccessToken(decoded.id);
        res.status(200).json({accesstoken:newAccessToken});
    }catch(err){
        console.log(err);
        next(err)
    }
}

const logout=(req,res)=>{
    res.clearCookie('refresh',{
        httpOnly:true,
        secure:process.env.NODE_ENV!=='development',
        sameSite:'strict'
    });
    res.status(200).json({message:"Logged out succesfully"})
};


module.exports={register,login,refreshToken,logout}