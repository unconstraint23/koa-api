const mysql = require("mysql2")
const config = require("../config/config.default")

const connection = mysql.createPool({
  host: config.MYSQL_HOST,
  port: config.MYSQL_PORT,
  database: config.MYSQL_DATABASE,
  user: config.MYSQL_USER,
  password: config.MYSQL_PWD
})

connection.getConnection((err,con) => {
  con.connect(err => {
    if(err) {
      console.log("mysql连接失败")
    } else {
      console.log("mysql连接成功")
    }
  })
})

module.exports = connection.promise() 