const dataAccess = require("../data-access");

const makeTestMessage = require("./test");
const testMessage = makeTestMessage({
  testDb: dataAccess.testDb,
});

module.exports = Object.freeze({
  testMessage,
});