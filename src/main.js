const fs = require("fs")

const {APP_PORT} = require("./config/config.default")
const morgan = require('koa-morgan')
const path = require("path")
const app = require("./app") 

require("./model")
// morgan 处理日志
const ENV = 'dev' 
if (ENV === 'dev') {
  app.use(morgan('dev'))  // 测试环境，打印在控制台
} else {  // 线上环境，写入文件
  const logFileName = path.join(__dirname, 'logs', 'access.log')
  const logStream = fs.createWriteStream(logFileName, { flags: 'a' })
  app.use(morgan('combined', {
    stream: logStream
  }))
}




  app.listen(APP_PORT,() => {
    console.log(`server is start on http://localhost:${APP_PORT}`)
})