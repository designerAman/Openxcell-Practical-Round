const TABLE_NAME = `users`;

module.exports = function makeUserDb({ mysql }) {
  return Object.freeze({
    searchUserDetails,
    addUser,
  });

  function generateSearchUserDetailQuery({ attributes, filterQuery, operator, joins }) {
    let query = `SELECT ${attributes.join(',')} FROM ${TABLE_NAME}`;
    const values = [];
    const whereClause = [];
    const joinsToAdd = [];

    if (joins && Object.keys(joins).length) {
      for (const join of Object.keys(joins)) {
        joinsToAdd.push(`${joins[join]['type']} JOIN ${join} ON ${joins[join]['on']}`);
      }
    }

    for (const query of Object.keys(filterQuery)) {
      const inClause = [];
      for (const value of filterQuery[query].values) {
        inClause.push(`?`);
        values.push(value);
      }

      if (inClause.length) {
        whereClause.push(`(
          ${query}
          ${filterQuery[query].check && filterQuery[query].check.toLowerCase() === 'notequal' ? 'NOT' : ''}
          IN (${inClause.join(',')})
        )`);
      }
    }

    if (joinsToAdd.length) {
      query += ` ${joinsToAdd.join(' ')}`;
    }

    if (whereClause.length > 0) {
      query += whereClause.length > 1 ? ` WHERE ${whereClause.join(' ' + operator + ' ')}` : ` WHERE ${whereClause[0]}`;
    }

    return { query, values };
  }

  async function searchUserDetails({ attributes, filterQuery, operator, joins }) {
    const { query, values } = generateSearchUserDetailQuery({ attributes, filterQuery, operator, joins });
    const [rows] = await mysql.query(query, values);

    return rows;
  }

  async function addUser({ userDetails }) {
    const query = `INSERT INTO ${TABLE_NAME} SET ?`;
    const values = [userDetails];

    await mysql.query(query, values,);
  }
}