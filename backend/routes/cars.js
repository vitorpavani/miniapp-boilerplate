const express = require('express');
const Cars = require('../models/cars');
const passport = require('passport');

const router = express.Router();

//GET all
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      return await Cars.findOne({}).then((found) => {
        found
          ? res.status(200).json(found)
          : res.status(404).json({ message: 'Car not found' });
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
      return await Cars.findOne({ _id: req.params.id }).then((found) => {
        found
          ? res.status(200).json(found)
          : res.status(404).json({ message: 'Car not found' });
      });
    } catch (error) {
      return res.status(500).json({ message: 'Server Error', errors: error });
    }
  }
);

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      return await Cars.create(req.body).then((res) => {
        res.status(200).json(res);
      });
    } catch (error) {
      return res.status(500).json({ message: 'Server Error', errors: error });
    }
  }
);

router.patch(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      return await Cars.findByIdAndUpdate(
        { _id: req.params.id },
        { $set: req.body },
        { new: true }
      ).then((found) => {
        found
          ? res.status(200).json(found)
          : res.status(404).json({ message: 'Car not found' });
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
      return await Cars.findByIdAndDelete(req.params.id).then((found) => {
        found
          ? res.status(200).json({ message: 'Car deleted' })
          : res.status(404).json({ message: 'Car not found' });
      });
    } catch (error) {
      return res.status(500).json({ message: 'Server Error', errors: error });
    }
  }
);

module.exports = router;
