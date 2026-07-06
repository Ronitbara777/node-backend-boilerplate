const logger=(req,res,next)=>{
  const time=new Date(Date.now()).toLocaleDateString();
  console.log(`[${time}] ${req.method.toString()} ${req.url.toString()}`);
  next();
}

module.exports = logger;