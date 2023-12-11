const mongoose = require("./db");

const feedbackSchema = new mongoose.Schema({
  name1: {
    type: String,
    required: true,
  },
  title1: {
    type: String,
    required: true,
  },
  description1: {
    type: String,
    required: true,
  },
});

const anonymousSchema = new mongoose.Schema({
  title2: {
    type: String,
    required: true,
  },
  description2: {
    type: String,
    required: true,
  },
});

const suggestionSchema = new mongoose.Schema({
  name3: {
    type: String,
    required: true,
  },
  title3: {
    type: String,
    required: true,
  },
  description3: {
    type: String,
    required: true,
  },
});

const Feedback = mongoose.model("Feedback", feedbackSchema);
const Anonymous = mongoose.model("Anonymous", anonymousSchema);
const Suggestion = mongoose.model("Suggestion", suggestionSchema);

module.exports = { Feedback, Anonymous, Suggestion };
