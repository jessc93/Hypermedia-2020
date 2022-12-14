const dotenv = require('dotenv');
const path = require('path');

// Load configuration from dotenv file
dotenv.config();

module.exports = {
  db_name: process.env.DB_NAME,
  db_username: process.env.DB_USERNAME,
  db_password: process.env.DB_PASSWORD,
  db_dialect: process.env.DB_DIALECT,
  db_host: process.env.DB_HOST,
};
