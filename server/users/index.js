const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const app = express();
const cors = require("cors");

// mongo DB connection calling it when server up
const DB = require("./config/Database");

const port = process.env.PORT || 5001;

const router = require("./config/Routes");

// applying middleware of express.json to get the form data as application/json format
app.use(express.json());

// applying middleware of cors to app
app.use(cors());
app.use(
  express.urlencoded({
    extended: false,
  })
);

/* 
routes for user
api => http://host:port/users/restAPICalls
*/
app.use("/users", router);

// creating server with express and running it up
const server = require("http").createServer(app);
server.listen(port, () => {
  DB();
  console.log("User Service running on port -->", port);
});
