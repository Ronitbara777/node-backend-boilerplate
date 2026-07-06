const express=require("express");
const logger=require("./middleware/logger");

const app = express();


app.use(logger);


module.exports=app;