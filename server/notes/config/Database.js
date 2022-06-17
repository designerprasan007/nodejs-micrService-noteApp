const mongoose = require("mongoose");

const configureDB = () => {
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
