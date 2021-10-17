const chalk = require('chalk');
const multer = require('multer');

const handleError = require('../controllers/handle-error');

const config = require('../config/environments');
const DB = require('../data-access');
const exceptions = require('../exceptions');

const makeVerifyUserAccessToken = require('./verify-user-access-token');
const verifyUserAccessToken = makeVerifyUserAccessToken({
  chalk,
  accessTokenDb: DB.accessTokenDb,
  AuthorizationError: exceptions.AuthorizationError,
  handleError,
});

const makeUploadImages = require('./upload-images');
const uploadImages = makeUploadImages({
  config,
  multer,
})

module.exports = Object.freeze({
  verifyUserAccessToken,
  uploadImages,
});