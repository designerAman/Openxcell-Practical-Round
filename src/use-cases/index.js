const dataAccess = require("../data-access");

const makeTestMessage = require("./test");
const testMessage = makeTestMessage({
  testDb: dataAccess.testDb,
});

const registrationAndProfileUseCases = require('./registration-and-profile');
const topicAndPostUseCases = require('./topic-and-post');

module.exports = Object.freeze({
  testMessage,
  registrationAndProfile: registrationAndProfileUseCases,
  topicAndPost: topicAndPostUseCases,
});