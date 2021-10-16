const Joi = require('joi');
const momentTZ = require('moment-timezone')

const DB = require('../../data-access');
const exceptions = require('../../exceptions');

const makeCreateTopic = require('./create-topic');
const createTopic = makeCreateTopic({ 
  Joi,
  momentTZ,
  topicDb: DB.topicDb,
  ValidationError: exceptions.ValidationError,
  AlreadyExistsError: exceptions.AlreadyExistsError,
});

module.exports = Object.freeze({
  createTopic,
});
