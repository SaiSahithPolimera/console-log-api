const JwtStrategy = require("passport-jwt").Strategy;
const passport = require("passport");
const { ExtractJwt } = require("passport-jwt");
const db = require("../db/queries");
require("dotenv").config();

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET_KEY,
};

passport.use(
  new JwtStrategy(jwtOptions, async (user, done) => {
    const userFound = await db.findUser(user.username);
    if (userFound === true) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  })
);

module.exports = passport;
