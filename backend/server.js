const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth");
const todoRoutes = require("./routes/todo");

dotenv.config();
connectDB();

const app = express();

app.use(express.json());
app.use(cors(({origin:"*",credentials:true})));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/todo", todoRoutes);
// Default Routes
app.get("/", (req, res) => {
  res.send("MongoDB is Connected & API is Running!");
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
