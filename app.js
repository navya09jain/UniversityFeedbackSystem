const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const passport = require("passport");
const { Feedback, Anonymous, Suggestion } = require("./src/models");
const initPassport = require("./src/auth");
const dotenv = require("dotenv").config();

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.static("views"));
app.use(express.static("src"));
app.use(
  session({
    secret: "navya",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
initPassport();
const authenticateMiddleware = (req, res, next) => {
  console.log("Checking authentication status...");
  console.log("Is authenticated : ", req.isAuthenticated());
  if (req.isAuthenticated()) {
    console.log("User is authenticated. Proceeding to the next middleware.");
    return next(); // User is authenticated, continue to the next middleware
  } else {
    console.log("User is not authenticated. Redirecting to login page.");
    return res.redirect("/login"); // Redirect to the login page if not authenticated
  }
};

app.get("/login", function (req, res) {
  res.sendFile(__dirname + "/views/login.html");
});
app.get("/mainpage", authenticateMiddleware, function (req, res) {
  res.sendFile(__dirname + "/views/mainpage.html");
});

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// app.get("/check-session", (req, res) => {
//   res.json(req.session);
// });

app.get(
  "/auth/google/callback",
  passport.authenticate("google"),
  (req, res) => {
    // Redirect to the main page
    res.redirect("/mainpage");
  }
);

app.get("/feedback", authenticateMiddleware, function (req, res) {
  res.sendFile(__dirname + "/views/feedback.html");
});
app.get("/suggestion", authenticateMiddleware, function (req, res) {
  res.sendFile(__dirname + "/views/suggestion.html");
});
app.get("/anonymous", authenticateMiddleware, function (req, res) {
  res.sendFile(__dirname + "/views/anonymous.html");
});
app.get("/logout", (req, res) => {
  // Logout the user by clearing the session
  req.logout(err => {
    if (err) {
      console.error("Error during logout:", err);
      return res.status(500).send("Internal Server Error");
    }

    // Redirect to the login page after logout
    res.redirect("/login");
  });
});

app.post("/feedback", function (req, res) {
  let newFeedback = new Feedback({
    name1: req.body.name1,
    title1: req.body.title1,
    description1: req.body.description1,
  });
  newFeedback.save();
  res.redirect("/feedback");
});

app.post("/anonymous", function (req, res) {
  let newAnonymous = new Anonymous({
    title2: req.body.title2,
    description2: req.body.description2,
  });
  newAnonymous.save();
  res.redirect("/anonymous");
});

app.post("/suggestion", function (req, res) {
  let newSuggestion = new Suggestion({
    name3: req.body.name3,
    title3: req.body.title3,
    description3: req.body.description3,
  });
  newSuggestion.save();
  res.redirect("/suggestion");
});

let port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("Server started");
});
