const express = require("express");
const userRouter = express.Router();

userRouter.get("/signup", function(req,res){
    res.send("You are at signup page");
})


module.exports = userRouter;
