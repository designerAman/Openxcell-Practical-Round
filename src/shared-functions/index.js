const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');

const makeValidatePassword = require('./validate-password');
const validatePassword = makeValidatePassword();

const makeCreateStringHash = require("./create-string-hash");
const createStringHash = makeCreateStringHash({
  bcrypt,
});

const makeSendEmail = require("./send-email");
const sendEmail = makeSendEmail({
  nodemailer,
});

const makeVerifyHashedString = require("./verify-hashed-string");
const verifyHashedString = makeVerifyHashedString({
  bcrypt
});

module.exports = Object.freeze({
  validatePassword,
  createStringHash,
  sendEmail,
  verifyHashedString,
});