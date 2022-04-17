const dodenv = require("dotenv")
const fs = require("fs")
const path = require("path")
dodenv.config()
const  {APP_PORT,MYSQL_HOST,MYSQL_USER,MYSQL_PORT,MYSQL_PWD,MYSQL_DATABASE,APP_HOST} = process.env
const PRIVATE_KEY = fs.readFileSync(path.resolve(__dirname,"./keys/private.key"))
const PUBLIC_KEY = fs.readFileSync(path.resolve(__dirname,"./keys/public.key"))
 module.exports = {
     MYSQL_HOST,
     MYSQL_USER,
     MYSQL_PORT,
     MYSQL_PWD,
     MYSQL_DATABASE,
     APP_PORT,
     PRIVATE_KEY,
     PUBLIC_KEY,
     APP_HOST
 }

