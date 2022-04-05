const connection = require("../model")

class MonmentService {
  async createMonment({id,content}) {
        const state = `
        INSERT INTO moment (content,user_id) VALUES (?,?);
        `
        console.log(content);
        try {
           const res = await connection.execute(state,[content,id])
           return res[0]
        } catch (error) {
            
        }
    }
  async getUserMoment(id) {
        const state = `
        SELECT user_id,content,moment.createAt createTime,moment.updateAt updateTime, 
        JSON_OBJECT("authId",user.id,"username",user.username) auth FROM moment LEFT JOIN user ON moment.user_id = user.id  WHERE moment.user_id = ?;
        `
        try {
            const res = await connection.execute(state,[id])
            return res[0]
        } catch (error) {
            
        }
  }
}

module.exports = new MonmentService()