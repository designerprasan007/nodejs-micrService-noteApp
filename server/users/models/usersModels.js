const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtToken = "IMCODEBUG";

const Schema = mongoose.Schema;
const userSchema = new Schema({
  email: {
    type: String,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
  },
});

userSchema.methods.MatchPass = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.getSignedToken = function () {
  return jwt.sign({ id: this._id }, jwtToken);
};

const User = mongoose.model("User", userSchema);
module.exports = User;
