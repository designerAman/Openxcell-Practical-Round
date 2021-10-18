const TABLE_NAME = `topics`;

module.exports = function makeTopicDb({ mysql }) {
  return Object.freeze({
    searchTopicDetails,
    addTopic,
  });

  function generateSearchTopicDetailQuery({ attributes, filterQuery, operator, joins, from, to }) {
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

    if(Number.isInteger(from) && Number.isInteger(to)) {
      query += ` LIMIT ${from}, ${to}`
    }

    return { query, values };
  }

  async function searchTopicDetails({ attributes, filterQuery, operator, joins, from, to}) {
    const { query, values } = generateSearchTopicDetailQuery({ attributes, filterQuery, operator, joins, from, to });

    const [rows] = await mysql.query(query, values);

    return rows;
  }

  async function addTopic({ topicDetails }) {
    const query = `INSERT INTO ${TABLE_NAME} SET ?`;
    const values = [topicDetails];

    await mysql.query(query, values,);
  }
}