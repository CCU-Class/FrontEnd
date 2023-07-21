const { Pool, Client } = require('pg')
require('dotenv').config();

const connection = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

module.exports = connection;