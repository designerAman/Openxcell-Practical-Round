const Joi = require('joi');
const momentTZ = require('moment-timezone');
const uuid = require('uuid');

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

const makeLogin = require('./login');
const login = makeLogin({
  Joi,
  uuid,
  userDb: DB.userDb,
  accessTokenDb: DB.accessTokenDb,
  verifyHashedString: sharedFunctions.verifyHashedString,
  ValidationError: exceptions.ValidationError,
  NotFoundError: exceptions.NotFoundError,
  AuthorizationError: exceptions.AuthorizationError,
});

module.exports = Object.freeze({
  register,
  login,
});
