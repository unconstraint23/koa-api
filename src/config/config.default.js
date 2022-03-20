const dodenv = require("dotenv")

dodenv.config()
const  {APP_PORT} = process.env

 module.exports = {
     dbUrl: "mongodb://localhost:27017/personProduct",
     APP_PORT
 }

