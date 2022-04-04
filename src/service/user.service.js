const { User } = require("../model")

class UserService {
    async createUser(userInfo) {

        // 写入数据库
        return "写入数据库成功"
    }
}
module.exports = new UserService()
