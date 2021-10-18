const TABLE_NAME = `posts`;

module.exports = function makePostDb({ mysql }) {
  return Object.freeze({
    addPost,
    searchPostDetails,
  });

  async function addPost({ postDetails }) {
    const query = `INSERT INTO ${TABLE_NAME} SET ?`;
    const values = [postDetails];

    await mysql.query(query, values,);
  }

  function generateSearchPostDetailQuery({ attributes, filterQuery, operator, joins, from, to, sortBy }) {
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

    if (Number.isInteger(from) && Number.isInteger(to)) {
      query += ` LIMIT ${from}, ${to}`
    }

    if (sortBy) {
      query += ` ORDER BY ${sortBy}`;
    }

    return { query, values };
  }

  async function searchPostDetails({ attributes, filterQuery, operator, joins, from, to, sortBy }) {
    const { query, values } = generateSearchPostDetailQuery({ attributes, filterQuery, operator, joins, from, to, sortBy });

    const [rows] = await mysql.query(query, values);

    return rows;
  }
}