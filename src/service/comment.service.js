const connection = require("../model")

class CommentService {
    async createMoment(req) {
        console.log(req);
        const {momentId,content,user} = req;
        const userId = user.id
        const state = `INSERT INTO comment(content,user_id,moment_id) VALUES(?,?,?);`
        try {
            const res = await connection.execute(state,[content,userId,momentId])
       return res[0]
        } catch (error) {
            
        }
       
    }
    async replyComment(req) {
      
        const {momentId,content,user,commentId} = req;
        const userId = user.id
        const state = `INSERT INTO comment(content,user_id,moment_id,comment_id) VALUES(?,?,?,?);`
        try {
            const res = await connection.execute(state,[content,userId,momentId,commentId])
            return res[0]
        } catch (error) {
            
        }
    }
    async updateComment(req) {
        const {content,commentId,user} = req;
        console.log(content,commentId)
        
        const state = `
        UPDATE comment SET content = ? WHERE id = ?;
        `
        try {
            const [res] = await connection.execute(state,[content,commentId])  
            return res
        } catch (error) {
            
        }
    }
    async removeComment(commentId) {
       
       
        
        const state = `
        DELETE FROM comment WHERE id = ?;
        `
        try {
            const [res] = await connection.execute(state,[commentId])  
            return res
        } catch (error) {
            
        }
    }
}

module.exports = new CommentService()