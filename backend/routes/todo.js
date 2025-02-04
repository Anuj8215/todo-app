const express = require("express");
const Todo = require("../models/Todo");
const jwt = require("jsonwebtoken");

const router = express.Router(); // do this

//middleware to check JWT
const authMiddleware = (req, res, next) => {
  const token = req.header("Authoriation");

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.id;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

// Add a new todo
router.post("/add", authMiddleware, async (req, res) => {
  try {
    const { text } = req.body;
    if (!text)
      return res.status(400).json({ message: "To-Do text is required" });

    const newTodo = new Todo({
      text,
      userId: req.user, // Create new todo
    });

    await newTodo.save(); // saves to DB
    res.json({ message: "Todo added", todo: newTodo });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }

  // Get all the To-do for logged in users

  router.get("/all", authMiddleware, async (req, res) => {
    try {
      const todos = await Todo.find({ userId: req.user });
      res.json(todos);
    } catch (error) {
      res.status(500).json({ message: "Server Error" });
    }
  });

  // Delete a todo

  router.delete("/delete/:id", authMiddleware);
  try {
    await Todo.findByIdAndDelete(req.params.id);
    res.json({ message: "To-Do deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
