const mongoose = require("mongoose");

// calling a connection function to the DB
const configureDB = () => {
  // mongo atlas url to connect the DB
  let url =
    "mongodb+srv://codebug:prasanna123@cluster0.ihev0.mongodb.net/microService";
  mongoose
    .connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log(`connected to Mongoose`);
    })
    .catch((err) => console.log(err));
};

module.exports = configureDB;
