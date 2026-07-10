const mongoose=require("mongoose");
const bcryptjs=require("bcryptjs");

const userSchema=new mongoose.Schema({
  name:{
    type:String,
    required:true,
  },
  email:{
    type:String,
    required:true,
    unique:true,
  },
  password:{
    type:String,
    required:true
  }
},{
  timestamps:true,
});

userSchema.pre('save',async function(){
  if(!this.isModified('password')){
    return;
  }
  const salt=await bcryptjs.genSalt(10);
  const hashedPassword=await bcryptjs.hash(this.password,salt);
  this.password=hashedPassword
})

userSchema.methods.matchPassword=async function(enteredPassword){
  return await bcryptjs.compare(enteredPassword,this.password);
};

module.exports=mongoose.model("User",userSchema);