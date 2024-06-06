let express = require("express");
const route = require("./todo.route");
let routes = express.Router();

routes.use("/todo", route);

module.exports = routes;
