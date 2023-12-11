const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const dotenv = require("dotenv").config();

const initPassport = () => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.clientid,
        clientSecret: process.env.clientsecret,
        callbackURL: "/auth/google/callback",
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          // No authentication process needed
          done(null, profile); // Pass the user profile to the next step
        } catch (error) {
          done(error, null);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    done(null, user);
  });
};

module.exports = initPassport;
