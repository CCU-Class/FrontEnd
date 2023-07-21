//const mysql = require("mysql2");
require('dotenv').config();

var connection = null;
if(process.env.USING_DATABASE== "postgre"){
  console.log("using postgre");
  connection = require('./postgreSQL.cjs');
}else if(process.env.USING_DATABASE== "mysql"){
  console.log("using mysql");
  connection = require('./mysqlDB.cjs');
}else{
  console.log("please choose a database!!");
  exit();
}
module.exports = connection;