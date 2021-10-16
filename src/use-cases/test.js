module.exports = function makeTestMessage({
  testDb
}) {
  return async function testMessage() {
    const messageFromDB = await testDb.testMessage();
    const message = `Openxcell practical Round app ${process.env.NODE_ENV || 'development'} server is running`;
    return messageFromDB ? message: `Something went wrong in ${process.env.NODE_ENV || 'development'} server`;
  };
};