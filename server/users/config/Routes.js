const express = require("express");

const user = express.Router();
const userControllers = require("../controllers/usersControllers");

// getting the user controller functions from the controller file

// Login User
user.post("/login", userControllers.login);

// get data of single user from id
user.get("/oneUser/:userId", userControllers.getSingleUser);

module.exports = user;
