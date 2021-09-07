const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const locationSchema = new Schema({
  lat: {
    type: Number,
    required: true,
  },
  lng: {
    type: Number,
    required: true,
  },
});

const CarsSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    engine: {
      type: String,
    },
    infotainment: {
      type: String,
    },
    design: {
      type: String,
    },
    location: {
      type: locationSchema,
      required: true,
    },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  }
);

module.exports = mongoose.model('Cars', CarsSchema);
