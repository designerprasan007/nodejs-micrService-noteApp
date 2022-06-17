const mongoose = require("mongoose");

// calling a connection function to the DB
const configureDB = () => {
  // mongo atlas url to connect the DB
  let url = process.env.MONGO_DB;
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
