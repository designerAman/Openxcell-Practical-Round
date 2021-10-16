const TABLE_NAME = `accessTokens`;

module.exports = function makeAccessTokenDb({ mysql }) {
  return Object.freeze({
    saveAccessToken,
  });

  async function saveAccessToken({ accessTokenDetails }) {
    const query = `INSERT INTO ${TABLE_NAME} SET ?`;
    const values = [accessTokenDetails];

    await mysql.query(query, values,);
  }
};