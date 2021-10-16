const chalk = require('chalk');

const handleError = require('../handle-error');
const registrationAndProfileUseCases = require('../../use-cases').registrationAndProfile;

const makeRegisterAction = require('./register');
const registerAction = makeRegisterAction({
  chalk,
  register: registrationAndProfileUseCases.register,
  handleError,
});

const makeLoginAction = require('./login');
const loginAction = makeLoginAction({
  chalk,
  login: registrationAndProfileUseCases.login,
  handleError,
});

module.exports = Object.freeze({
  registerAction,
  loginAction,
});