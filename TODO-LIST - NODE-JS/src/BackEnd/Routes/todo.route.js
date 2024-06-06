let express = require("express");
const { todoController } = require("../Controller");
let route = express.Router();

route.post("/post", todoController.posttodo);
route.get("/get", todoController.gettodo);
route.get("/uncompleted", todoController.uncompleted);
route.get("/completed", todoController.completed);
route.delete("/delete/:id", todoController.deletetodo);
route.put("/update/:id", todoController.updatetodo);

module.exports = route;
