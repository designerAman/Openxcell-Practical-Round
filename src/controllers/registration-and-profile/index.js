const chalk = require('chalk');

const handleError = require('../handle-error');
const registrationAndProfileUseCases = require('../../use-cases').registrationAndProfile;

const makeRegisterAction = require('./register');
const registerAction = makeRegisterAction({
  chalk,
  register: registrationAndProfileUseCases.register,
  handleError,
});

module.exports = Object.freeze({
  registerAction,
});