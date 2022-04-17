
const connection = require("../model")
class UserService {
    async createUser(userInfo) {
        const {username,password} = userInfo
        const state = `INSERT INTO user (username,password) VALUES (?,?);`
        const result = await connection.execute(state,[username,password])
        // 写入数据库
        return result[0]
    }
    async getUserByUserName(userInfo) {
        const {username} = userInfo
        const state = `SELECT * FROM user WHERE username = ?;`
        try {
            const result = await connection.execute(state,[username])
        return result[0]
        } catch (error) {
            
        }
        
    }
    async updateUserAvatar(url,id) {
        const state = `
        UPDATE user SET avatar_url = ? WHERE id = ?;
        `
        try {
            const [res] = await connection.execute(state,[url,id])
            console.log(res);
            return res
        } catch (error) {
            
        }
    }
}
module.exports = new UserService()
