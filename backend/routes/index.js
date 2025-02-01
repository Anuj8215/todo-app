const express = require("express");
const router = express.Router();
const userRouter = require("./user")


router.get("/hello",(req,res)=>{
    res.send("hello");
})


router.use("/user",userRouter)
router.use("/todo")




module.exports = router;