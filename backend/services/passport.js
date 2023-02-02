const passport = require("passport");
const User = require("../models/user.model");
const JwtStrategy = require("passport-jwt").Strategy;
const { ExtractJwt } = require("passport-jwt");
const LocalStrategy = require("passport-local");
const bcrypt = require("bcrypt");

// ** setting local strategy:
const localOptions = { usernameField: "email" };
const localLogin = new LocalStrategy(
  localOptions,
  async (email, password, done) => {
    try {
      const user = (await User.findByEmail(email))[0];

      // TODO: password compare
      typeof user !== "undefined" &&
        bcrypt.compare(password, user.password, function (err, result) {
          // result == true
          if (result === true) {
            return done(null, user);
          } else {
            return done(null, false);
          }
        });
      if (typeof user === "undefined") throw new Error("Not registered user.");
    } catch (error) {
      return done(error);
    }
  }
);

// ** setting the jwt strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.TOKEN_SECRET,
};

const jwtLogin = new JwtStrategy(jwtOptions, function (payload, done) {
  var date = new Date(new Date().getTime() - payload.iat).getTime();
  date > 48 * 60 * 60 * 1000 && done(new Error("Token expiration"));
  User.findByEmail(payload.sub)
    .then((user) => {
      if (user.length === 1) {
        done(null, user[0]);
      } else {
        done(null, false);
      }
    })
    .catch((err) => done(err));
});

// ** tell passport to use defined strategies:
passport.use(jwtLogin);
passport.use(localLogin);
