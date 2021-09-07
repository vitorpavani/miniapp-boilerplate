const bcrypt = require('bcrypt');
const passport = require('passport');

// Passport configuration
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');

const User = require('../models/user');

// Options for Jwt Strategy
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET;
opts.ignoreExpiration = true;

// we serialize only the `_id` field of the user to keep the information stored minimum
passport.serializeUser((user, done) => {
  done(null, user._id);
});

// when we need the information for the user, the deserializeUser function is called with the id that we previously serialized to fetch the user from the database
passport.deserializeUser((id, done) => {
  User.findById(id)
    .then((dbUser) => {
      done(null, dbUser);
    })
    .catch((err) => {
      console.error(err.message);
      done(err);
    });
});

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    (username, password, done) => {
      User.findOne({ email: username })
        .then((found) => {
          console.log(found);
          if (found === null) {
            console.log(1);
            done(null, false, { message: 'Invalid Credentials1' });
          } else if (!found.password) {
            console.log(2);
            done(null, false, { message: 'Invalid Credentials2' });
          } else if (!bcrypt.compareSync(password, found.password)) {
            console.log(3);
            done(null, false, { message: 'Invalid Credentials3' });
          } else {
            done(null, found);
          }
        })
        .catch((err) => {
          console.error(err.message);
          done(err, false);
        });
    }
  )
);

passport.use(
  new JwtStrategy(opts, (payload, done) => {
    // Check token expiration time
    const expTime = payload.exp; // UTC in seconds
    const currentTime = Date.now().valueOf() / 1000; // Converted from miilliseconds to seconds, UTC
    if (expTime) {
      // console.log(`exp: ${expTime} currentTime: ${currentTime}`);
      if (expTime < currentTime) {
        payload.user.expired = true;
        // console.log(payload.user);
        return done(null, payload.user);
      }
    }

    User.findOne({ _id: payload.id })
      .select('-password')
      .then((found) => {
        if (found) {
          return done(null, found);
        }
        return done(null, false);
      })
      .catch((err) => {
        console.error(err.message);
        done(err, false);
      });
  })
);

module.exports = passport;
