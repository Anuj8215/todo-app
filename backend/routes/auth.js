const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const zod = require("zod");

const router = express.Router();

// zod validation

const userSchema = zod.object({
  username: zod.string().min(3, "Username must be atleast 3 charactes"),
  password: zod.string().min(6, "Password must be atleast 6 characters"),
});

// User Signup Route
router.post("/signup", async (req, res) => {
  try {
    const parsedData = userSchema.parse(req.body);
    const { username, password } = parsedData;
    const userExists = await User.findOne({ username });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }
    const newUser = new User({ username, password });
    await newUser.save();
    res.status(201).json({ message: "User registered Successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// User login route

router.post("/login", async (req, res) => {
  try {
    const parsedData = userSchema.parse(req.body);
    const { username, password } = parsedData;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    // check password matches
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    // jwt creation

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ message: "Login Successful", token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;

