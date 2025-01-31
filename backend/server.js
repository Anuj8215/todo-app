require("dotenv").config(); // load env
const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config");



// Creating Middleware

app.use(cors()); // Allows frontend to call backend 
app.use(express.json()); // Allows backedn to accept JSON data


connectDB(); // DB CONNECTION

app.get("/user",(req,res) =>{
    res.send("todo-app backend is running")
})

app.listen(3000);
