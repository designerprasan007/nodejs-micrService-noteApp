const express = require("express");

const user = express.Router();
const userControllers = require("../controllers/usersControllers");

user.post("/login", userControllers.login);

user.get("/oneUser/:userId", userControllers.getSingleUser);

module.exports = user;
