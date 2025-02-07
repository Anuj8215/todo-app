const express = require("express");
const Todo = require("../models/Todo");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// ✅ Add To-Do
router.post("/add", authMiddleware, async (req, res) => {
  console.log("Received Data:", req.body); 
  console.log("User ID from token:", req.id);  // Debugging log

  const { text } = req.body;
  const userId = req.id;

  try {
    if (!text) {
      return res.status(400).json({ message: "Please enter a valid task" });
    }

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized: User ID is missing" });
    }

    const newTodo = new Todo({
      text,
      userId,  
    });

    const response = await newTodo.save();
    res.status(201).json({
      message: "Todo added successfully",
      todo: response,
    });
  } catch (error) {
    console.error("Error while adding Todo:", error);
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
});

// ✅ Get All To-Dos for Logged-In User
router.get("/all", authMiddleware, async (req, res) => {
  try {
    console.log("User ID:", req.id);  // Debugging log
    const todos = await Todo.find({ userId: req.id });

    res.status(200).json(todos);
  } catch (error) {
    console.error("Error fetching Todos:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
});

// ✅ Delete To-Do by ID
router.delete("/delete/:id", authMiddleware, async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    // Ensure that the user deleting the todo is the owner
    if (todo.userId.toString() !== req.id) {
      return res.status(403).json({ message: "Unauthorized: You cannot delete this To-Do" });
    }

    await Todo.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "To-Do Deleted Successfully" });

  } catch (error) {
    console.error("Error deleting Todo:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
});

module.exports = router;
