const express = require("express");
const app = express();
const cors = require("cors");
const DB = require("./config/Database");

const port = 5002;

const router = require("./config/Routes");

app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);

app.use("/notes", router);

const server = require("http").createServer(app);
server.listen(port, () => {
  DB();
  console.log("Notes Service running on port -->", port);
});
