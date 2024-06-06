const { todoService } = require("../Service");

let posttodo = async (req, res) => {
  try {
    let body = req.body;
    let task = body.task;

    let duplicate = await todoService.finadname(task);

    if (duplicate) {
      throw new Error(`"${duplicate.task}" already exists`);
    }

    let result = await todoService.posttodo(body);

    if (!result) {
      throw new Error("Something went wrong");
    }
    res.status(201).json({
      message: "task created successfully",
      result,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

let gettodo = async (req, res) => {
  try {
    let result = await todoService.gettodo();
    res.status(200).json({
      message: "Get all Task successfully",
      result,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

let deletetodo = async (req, res) => {
  try {
    let { id } = req.params;
    let result = await todoService.deletetodo(id);
    res.status(200).json({
      message: "Deleted successfully",
      result,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

let updatetodo = async (req, res) => {
  try {
    let body = req.body;
    let { id } = req.params;
    let result = await todoService.updatetodo(id, body);
    res.status(200).json({
      message: "Task updated successfully",
      body,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

let completed = async (req, res) => {
  try {
    let todos = await todoService.gettodo();
    let completedTasks = todos.filter((todo) => todo.status === true);

    res.status(200).json({
      message: "Get all completed Task successfully",
      result: completedTasks,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

let uncompleted = async (req, res) => {
  try {
    let todos = await todoService.gettodo();
    let uncompletedTasks = todos.filter((todo) => todo.status === false);

    res.status(200).json({
      message: "Get all uncompleted Tasks successfully",
      result: uncompletedTasks,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  uncompleted,
  posttodo,
  completed,
  gettodo,
  deletetodo,
  updatetodo,
};
