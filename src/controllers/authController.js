const User=require("../model/User.js")
const generateToken=require("../utils/generateToken.js")
const register=async (req,res)=>{
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
        res.status(201).json({message:"Registration successful",user:{name:user.name,email:user.email}})
    }catch(err){
        console.log(err)
    }
}

const login=async (req,res)=>{
    try{
        const {email, password}=req.body;
        const user= await User.findOne({email});
        if(user && (await user.matchPassword(password))){
            res.status(200).json({msg:"Login succesfull",user:{name:user.name,email:user.email},token:generateToken(user._id)})
        }else{
            res.status(401).json({msg:"invalid email or password"})
        }
    }catch(err){
        console.log(err);
        res.status(500).json({message:"internal server error"});
    }
}

module.exports={register,login}