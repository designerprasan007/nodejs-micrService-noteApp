const mongoose = require("mongoose");

const configureDB = () => {
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
