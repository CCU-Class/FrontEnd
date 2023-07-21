require('dotenv').config();
const mysql2 = require("mysql2");


const connection = mysql2.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    database: process.env.MYSQL_DATABASE,
    password: process.env.MYSQL_PASSWORD,
    ssl:{rejectUnauthorized: false}
});

module.exports = connection;