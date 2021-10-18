const TABLE_NAME = `comments`;

module.exports = function makeCommentDb({ mysql }) {
  return Object.freeze({
    addComment,
  });

  async function addComment({ commentDetails }) {
    const query = `INSERT INTO ${TABLE_NAME} SET ?`;
    const values = [commentDetails];

    await mysql.query(query, values,);
  }
}