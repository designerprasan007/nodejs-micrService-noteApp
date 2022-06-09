const userControllers = {};
const User = require("../models/usersModels");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtToken = "IMCODEBUG";

userControllers.login = async (req, res) => {
  let { email, password } = req.body;
  try {
    const preUser = await User.findOne({ email });
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
      isCorrectPass = await bcrypt.compare(password, preUser.password);
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
        res.status(403).json({ success: false, error: "Incorrect password!!" });
      }
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

userControllers.getSingleUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId).select("_id email");
    if (!user)
      return res.status(401).json({ success: false, error: "Un-authorized!!" });
    res.status(200).json({ success: true, user });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};
module.exports = userControllers;
