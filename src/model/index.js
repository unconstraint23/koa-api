const mongoose = require('mongoose');

const {dbUrl} = require("../config/config.default")



main().catch(err => console.log("mongoDb连接失败",err));

async function main() {
  await mongoose.connect(dbUrl,() => {
    console.log('MongoDB 数据库连接成功')
  });
}

module.exports = {
    User: mongoose.model("User",require("./User"))
}