const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

mongoose
  .connect(
    "mongodb+srv://" +
      process.env.userid +
      ":" +
      process.env.password +
      "@cluster0.qwfzymp.mongodb.net/FeedbackSystem",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("Connected to MongoDB Atlas");
  })
  .catch(err => {
    console.error("Error connecting to database:", err);
  });

module.exports = mongoose;
