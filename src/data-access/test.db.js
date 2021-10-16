module.exports = function makeTestDb({
  mysql
}) {
  return Object.freeze({
    testMessage,
  });

  async function testMessage() {
    const [result] = await mysql.query(`SELECT 'Test Message' AS message;`);

    return result[0];
  }
};