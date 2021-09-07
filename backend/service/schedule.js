const User = require('../models/user');
const Cars = require('../models/cars');
const Scheduler = require('../models/scheduler');

const scheduleDemand = async (demand) => {
  try {
    Scheduler.create().then((created) => {
      return created;
    });
  } catch (error) {
    return error;
  }
};

module.exports = { scheduleDemand };
