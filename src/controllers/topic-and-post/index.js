const chalk = require('chalk');
const fs = require('fs');

const handleError = require('../handle-error');
const topicAndPostUseCases = require('../../use-cases').topicAndPost;

const makeCreateTopicAction = require('./create-topic');
const createTopicAction = makeCreateTopicAction({
  chalk,
  createTopic: topicAndPostUseCases.createTopic,
  handleError,
});

const makeCreatePostAction = require('./create-post');
const createPostAction = makeCreatePostAction({
  chalk,
  fs,
  createPost: topicAndPostUseCases.createPost,
  handleError,
});

module.exports = Object.freeze({
  createTopicAction,
  createPostAction,
});