const dodenv = require("dotenv")

dodenv.config()
const  {APP_PORT,MYSQL_HOST,MYSQL_USER,MYSQL_PORT,MYSQL_PWD,MYSQL_DATABASE} = process.env

 module.exports = {
     MYSQL_HOST,
     MYSQL_USER,
     MYSQL_PORT,
     MYSQL_PWD,
     MYSQL_DATABASE,
     APP_PORT
 }

