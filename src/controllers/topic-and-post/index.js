const chalk = require('chalk');

const handleError = require('../handle-error');
const topicAndPostUseCases = require('../../use-cases').topicAndPost;

const makeCreateTopicAction = require('./create-topic');
const createTopicAction = makeCreateTopicAction({
  chalk,
  createTopic: topicAndPostUseCases.createTopic,
  handleError,
});

module.exports = Object.freeze({
  createTopicAction,
});
