const { todoSchema } = require("../model");

let posttodo = (body) => {
  return todoSchema.create(body);
};
let gettodo = () => {
  return todoSchema.find();
};
let deletetodo = (id) => {
  return todoSchema.findByIdAndDelete(id);
};
let updatetodo = (id, body) => {
  return todoSchema.findByIdAndUpdate(id, body);
};
let finadname = (task) => {
  return todoSchema.findOne({ task });
};
module.exports = { posttodo, gettodo, deletetodo, finadname, updatetodo };
