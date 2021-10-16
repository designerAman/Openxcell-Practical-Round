const Joi = require('joi');
const momentTZ = require('moment-timezone');

const DB = require('../../data-access');
const exceptions = require('../../exceptions');
const sharedFunctions = require('../../shared-functions');

const makeRegister = require('./register');
const register = makeRegister({
  Joi,
  momentTZ,
  userDb: DB.userDb,
  validatePassword: sharedFunctions.validatePassword,
  createStringHash: sharedFunctions.createStringHash,
  sendEmail: sharedFunctions.sendEmail,
  ValidationError: exceptions.ValidationError,
  AlreadyExistsError: exceptions.AlreadyExistsError,
});

module.exports = Object.freeze({
  register,
});
