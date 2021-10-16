const useCases = require("../use-cases");
const handleError = require("./handle-error");

const makeTestMessageAction = require("./test-message");
const testMessageAction = makeTestMessageAction({
  testMessage: useCases.testMessage,
  handleError,
});

const registrationAndProfileActions = require("./registration-and-profile");
const topicAndPostActions = require("./topic-and-post");

module.exports = Object.freeze({
  testMessageAction,
  registrationAndProfile: registrationAndProfileActions,
  topicAndPost: topicAndPostActions,
});
