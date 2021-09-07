const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const passport = require('passport');

//GET all
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      return await User.find({}).then((found) => {
        found
          ? res.status(200).json(found)
          : res.status(404).json({ message: 'Users not found' });
      });
    } catch (error) {
      return res.status(500).json({ message: 'Server Error', errors: error });
    }
  }
);

//GET by ID
router.get(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      return await User.findOne({ _id: req.params.id }).then((found) => {
        found
          ? res.status(200).json(found)
          : res.status(404).json({ message: 'User not found' });
      });
    } catch (error) {
      return res.status(500).json({ message: 'Server Error', errors: error });
    }
  }
);

//POST new user (signup)
router.post('/', async (req, res) => {
  console.log(req.body);

  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: 'Please provide email and password' });
  }

  try {
    await User.findOne({ email }).then((found) => {
      console.log(found);
      if (found) {
        return res.status(400).json({ message: 'User already exists' });
      }

      const salt = bcrypt.genSaltSync();
      const hash = bcrypt.hashSync(password, salt);

      User.create({ email, password: hash }).then((created) => {
        if (created) {
          const payload = { email: created.email };
          const token = jwt.sign(payload, process.env.JWT_SECRET);

          return res.status(201).json({ token });
        }
      });
    });
  } catch (error) {
    return res.status(500).json({ message: 'Server Error', errors: error });
  }
});

router.patch(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      return await User.findByIdAndUpdate(
        { _id: req.params.id },
        { $set: req.body },
        { new: true }
      ).then((found) => {
        found
          ? res.status(200).json(found)
          : res.status(404).json({ message: 'User not found' });
      });
    } catch (error) {
      return res.status(500).json({ message: 'Server Error', errors: error });
    }
  }
);

router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      User.findByIdAndDelete(req.params.id).then((found) => {
        return found
          ? res.status(200).json({ message: 'User deleted' })
          : res.status(404).json({ message: 'User not found' });
      });
    } catch (error) {
      return res.status(500).json({ message: 'Server Error', errors: error });
    }
  }
);

module.exports = router;
