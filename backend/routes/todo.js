const express = require("express");
const Todo = require("../models/Todo");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/add", authMiddleware, async (req, res) => {
  const { text } = req.body;
  const userId = req.id;
  try {
    if (!text)
      return res.status(402).json({ message: "please enter the input" });
    const newTodo = new Todo({
      text: text,
      userId: userId,
    });

    const response = await newTodo.save();
    res.json({
      message: "Todo added successfully",
      Todo: response,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "internal server error",
    });
  }
});


router.get("/all", authMiddleware, async (req,res) => {
  try{
      console.log(req.id);
      const todos = await Todo.find({userId:req.id});
      res.json(todos);
  }catch{
      res.status(500).json({message : "Server Error"});
  }
});


router.delete("/delete/:id",authMiddleware,async(req,res)=>{
  try{
    await Todo.findByIdAndDelete(req.params.id);
    res.json({message: "To-Do Deleted"});
  }catch(error){
    res.status(500).json({message:"Server Error"});
  }
});


module.exports = router;
