const MYSQL = require("mysql2");
const chalk = require("chalk");

const config = require("../config/environments");

let mysql = MYSQL.createConnection({
  host: `${config.mysql.host}`,
  user: `${config.mysql.user}`,
  password: `${config.mysql.password}`,
  database: `${config.mysql.db}`,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

mysql = mysql.promise();

const makeTestDb = require('./test.db');
const testDb = makeTestDb({ mysql });

module.exports = Object.freeze({
  testDb,
});