//userSchema
const User = require("./../models/user")
const bodyParser = require('body-parser')
const passport = require("passport");

const GoogleStrategy = require('passport-google-oauth20').Strategy;


var urlencodedParser = bodyParser.urlencoded({ extended: false })


passport.use(User.createStrategy());

//serializing user creating session cookie
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

// deserializing cookie to get user info
passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "https://acm-bluff.herokuapp.com/auth/google/home",
  userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
},
  // function for verify and storing user into database
  function (accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));
