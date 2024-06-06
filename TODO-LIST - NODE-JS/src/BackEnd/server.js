let http = require("http");
const express = require("express");
const connectDb = require("./db/connectDb");
const routes = require("./Routes");
let cors = require("cors");
const app = express();
app.use(
  cors({
    origin: "*",
  })
);
// body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/v1", routes);

// Database Connect
connectDb();

// server
http.createServer(app).listen(8001, () => {
  console.log("Server is running on port 3001");
});
