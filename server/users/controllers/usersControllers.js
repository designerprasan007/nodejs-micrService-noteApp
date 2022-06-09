const userControllers = {};
const User = require("../models/usersModels");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtToken = "IMCODEBUG";

/*
user login function,
here the process is, it's checking for email presence,
if email available then it's checking for the password, 
else it's creating new user with the given email and password
*/
userControllers.login = async (req, res) => {
  // fetching email and password from the body
  let { email, password } = req.body;
  try {
    // checking is email already present
    const preUser = await User.findOne({ email });
    // if email is not present creating the hashed password and storing email to DB
    if (!preUser) {
      const salt = await bcrypt.genSalt(10);
      bcryptPassword = await bcrypt.hash(password, salt);
      let data = {
        email,
        password: bcryptPassword,
      };
      let createUser = await new User(data);
      await createUser.save();
      const token = jwt.sign({ id: createUser._id }, jwtToken, {
        expiresIn: "30d",
      });
      let userData = {
        token,
        email: email,
      };
      res.status(200).json({ success: true, userData });
    } else {
      // is email present checking the password,
      isCorrectPass = await bcrypt.compare(password, preUser.password);
      // if password matches signing in the JWT token with userData and sending user data in response
      if (isCorrectPass) {
        const token = jwt.sign({ id: preUser._id }, jwtToken, {
          expiresIn: "30d",
        });
        let userData = {
          token,
          email: email,
        };
        res.status(200).json({ success: true, userData });
      } else {
        // if password doesn't match sending 403 un-auth error
        res.status(401).json({ success: false, error: "Incorrect password!!" });
      }
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

userControllers.getSingleUser = async (req, res) => {
  // fetching user id from the url params
  const { userId } = req.params;
  try {
    // getting the user with the id and selecting only _id and email from the DB
    const user = await User.findById(userId).select("_id email");
    // if user not found sending back 401 response
    if (!user)
      return res.status(403).json({ success: false, error: "Forbidden!!" });
    // else sending the user data in response
    res.status(200).json({ success: true, user });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};
module.exports = userControllers;
