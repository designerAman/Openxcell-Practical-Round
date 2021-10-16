module.exports = function makeTestMessageAction({
  testMessage,
  handleError,
}) {
  return async function testMessageAction(req, res) {
    try {
      const testMessageData = await testMessage();
      return res.json({
        status: "success",
        message: testMessageData,
      });
    } catch (error) {
      console.log(`Error in text-message`, error);
      console.log({ error });
      return handleError({ error, res });
    }
  };
};