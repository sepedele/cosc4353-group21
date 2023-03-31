const mysql = require('mysql');

const connection = mysql.createConnection(
  {
      user: 'root',
      host: 'localhost',
      password: 'hAmHelp3r$',
      database: 'FuelQuoteSystem'
  }
);

module.exports = connection;