const cors=require("cors");
const rateLimit=require('express-rate-limit');
const express=require("express");
const logger=require("./middleware/logger");
const cookieParser=require("cookie-parser");

const authRoutes=require("./routes/authRoutes");
const errorHandler=require("./middleware/error");

const app = express();
app.use(cors());
const limiter=rateLimit({
    windowMs:15*60*1000,
    max:100,
    message:"Too many requests, please try again later"
});
app.use(limiter);
app.use(cookieParser());
app.use(express.json());
app.use(logger);
app.use("/api/auth",authRoutes);
app.use(errorHandler);

module.exports=app;