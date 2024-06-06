let mongoose = require("mongoose");

let connectDb = () => {
  mongoose
    .connect("mongodb://localhost:27017/to-do")
    .then(() => {
      console.log("dataBase Connect successfully");
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = connectDb;
