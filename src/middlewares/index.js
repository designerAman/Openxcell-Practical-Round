const chalk = require('chalk');

const handleError = require('../controllers/handle-error');
const DB = require('../data-access');
const exceptions = require('../exceptions');

const makeVerifyUserAccessToken = require('./verify-user-access-token');
const verifyUserAccessToken = makeVerifyUserAccessToken({
  chalk,
  accessTokenDb: DB.accessTokenDb,
  AuthorizationError: exceptions.AuthorizationError,
  handleError,
});

module.exports = Object.freeze({
  verifyUserAccessToken,
});