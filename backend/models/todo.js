const { text } = require("express");
const  mongoose = require("mongoose");


// Defined Schema Structure for a TO-DO item
const TodoSchema = new mongoose.Schema({
    text: {type: String,   // Task Text
           required: true 
    },
    completed:{type:Boolean,
                default:false  //task is set to false as default             
    },
});

const Todo = mongoose.model("Todo",TodoSchema);

module.exports = Todo;