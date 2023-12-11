const mysql = require('mysql');
const dotenv = require('dotenv');

dotenv.config({path: './.env'})
const dbConfig = {
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
};

const connection = mysql.createConnection(dbConfig);

connection.connect((err) => {
  if (err) {
    console.error('Connection error:', err);
    throw err;
  }
  console.log('Succes');
});

module.exports = connection;