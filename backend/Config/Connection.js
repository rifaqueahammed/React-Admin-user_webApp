const mongoose = require("mongoose");

module.exports = () => {
    const uri = 'mongodb://0.0.0.0:27017/week15';
    mongoose
      .connect(uri)
      .then(() => {
        console.log(`Databse connected`);
      })
      .catch((err) => {
        console.log(`Database connection failed : ${err}`);
      });
  };
  