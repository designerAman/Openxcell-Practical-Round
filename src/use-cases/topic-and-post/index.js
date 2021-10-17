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

const makeCreatePost = require('./create-post');
const createPost = makeCreatePost({
  Joi,
  momentTZ,
  postDb: DB.postDb,
  topicDb: DB.topicDb,
  ValidationError: exceptions.ValidationError,
  NotFoundError: exceptions.NotFoundError,
});

const makeGetTopics = require('./get-topics');
const getTopics = makeGetTopics({
  Joi,
  topicDb: DB.topicDb,
  ValidationError: exceptions.ValidationError,
});

module.exports = Object.freeze({
  createTopic,
  createPost,
  getTopics,
});
