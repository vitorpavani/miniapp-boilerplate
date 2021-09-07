const express = require('express');
const router = express.Router();
const passport = require('passport');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const { JsonWebTokenError } = require('jsonwebtoken');


// Login user
router.post('/login', (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(401).json({ message: 'Email or password not valid' });
  }

  passport.authenticate('local', async (err, user) => {
    if (err) {
      return res.status(500).json({ message: 'Server Error', errors: err });
    }
    if (!user) {
      return res.status(400).json({ message: 'Invalid Credentials' });
    }

    const token = await jwt.sign({ id: user.id }, process.env.JWT_SECRET);

    // generateTokens(user)
    //   .then((tokens) => res.status(200).json(tokens))
    //   .catch((error) => {
    //     res.status(500).json({ message: 'Server Error', errors: error });
    //   });
    return res.status(200).json({ message: 'Login Successful', token });
  })(req, res);
});

module.exports = router;
