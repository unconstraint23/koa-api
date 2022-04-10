const connection = require("../model")

class AuthVerify {
    async checkResource(tableName,userId,resourceId) {
       
        const state = `
        SELECT * FROM ${tableName} WHERE id = ? AND user_id = ?;
        `
        try {
            const [res] = await connection.execute(state, [resourceId, userId])
            return res
        } catch (error) {
            
        }
    }
}
module.exports = new AuthVerify()