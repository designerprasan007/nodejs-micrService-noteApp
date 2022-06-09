const express = require("express");
const app = express();
const cors = require("cors");

const DB = require("./config/Database");

const port = 5001;

const router = require("./config/Routes");

app.use(express.json());
app.use(cors());
app.use(
  express.urlencoded({
    extended: false,
  })
);

app.use("/users", router);

const server = require("http").createServer(app);
server.listen(port, () => {
  DB();
  console.log("User Service running on port -->", port);
});
