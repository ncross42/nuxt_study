require('dotenv').config()

function createPool() {
  try {
    const mysql = require('mysql2');

    const pool = mysql.createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_SCHEMA,
      connectionLimit: 10,
      waitForConnections: true,
      queueLimit: 0
    });

    const promisePool = pool.promise();

    return promisePool;
  } catch (error) {
    return console.log(`Could not connect - ${error}`);
  }
}

const pool = createPool();

module.exports = {
  connection: async () => pool.getConnection(),
  query: (...params) => pool.query(...params),
  execute: (...params) => pool.execute(...params)
};