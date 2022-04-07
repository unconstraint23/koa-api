const connection = require("../model")

class AuthVerify {
    async userAndMonentId(userId,momentId) {
        const state = `
        SELECT * FROM moment WHERE id = ? AND user_id = ?;
        `
        try {
            const res = await connection.execute(state, [momentId, userId])
            return res[0]
        } catch (error) {
            
        }
    }
}
module.exports = new AuthVerify()