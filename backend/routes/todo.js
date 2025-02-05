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
