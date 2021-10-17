const TABLE_NAME = `posts`;

module.exports = function makePostDb({ mysql }) {
  return Object.freeze({
    addPost,
  });

  async function addPost({ postDetails }) {
    const query = `INSERT INTO ${TABLE_NAME} SET ?`;
    const values = [postDetails];

    await mysql.query(query, values,);
  }
}