let mongoose = require("mongoose");

let todoSchema = new mongoose.Schema({
  task: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    default: false,
  },
});

let todoData = mongoose.model("todoSchema", todoSchema);
module.exports = todoData;
