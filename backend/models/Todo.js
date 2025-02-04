const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId, // do this
    ref: "User", // do this
    required: true,
  },
});

module.exports = mongoose.model("Todo", todoSchema);
