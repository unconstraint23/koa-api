const connection = require("../model")
const userMomentFrag = `
SELECT user_id,content,moment.createAt createTime,moment.updateAt updateTime, 
JSON_OBJECT("authId",user.id,"username",user.username) auth FROM moment LEFT JOIN user ON moment.user_id = user.id 
  `
class MonmentService {

  async createMonment({ id, content }) {
    const state = `
        INSERT INTO moment (content,user_id) VALUES (?,?);
        `

    try {
      const res = await connection.execute(state, [content, id])
      return res[0]
    } catch (error) {

    }
  }
  async getUserMoment(req) {
    const { id, pageStart = 0, length = 5 } = req
    let state;
   
    try {
      if (id) {

        state = `${userMomentFrag} WHERE moment.user_id = ? LIMIT ${pageStart},${length};`
        
        const res = await connection.execute(state, [id])
      
        return res[0]
      } 
      else {
       
        state = ` ${userMomentFrag}
          LIMIT ${pageStart},${length};
         `
        const res = await connection.execute(state)

        return res[0]
      }
    } catch (error) {

    }
  }
  async updateUserMonent(req) {
    const {content,momentId} = req
    const state = `
    UPDATE moment SET content = ? WHERE id = ?;
        `

    try {
      const res = await connection.execute(state, [content, momentId])
      return res[0]
    } catch (error) {

    }
  }
}

module.exports = new MonmentService()