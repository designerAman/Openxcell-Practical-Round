const useCases = require("../use-cases");
const handleError = require("./handle-error");

const makeTestMessageAction = require("./test-message");
const testMessageAction = makeTestMessageAction({
  testMessage: useCases.testMessage,
  handleError,
});

module.exports = Object.freeze({
  testMessageAction,
});
