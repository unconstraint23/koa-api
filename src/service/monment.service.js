const connection = require("../model")
const userMomentFrag = `
SELECT m.user_id,m.content,m.createAt createTime,m.updateAt updateTime, 
 JSON_OBJECT("authId",u.id,"username",u.username,"avatar",u.avatar_url) auth,
	IF(COUNT(la.id),JSON_ARRAYAGG(JSON_OBJECT("id",la.id,"name",la.name))
	
	,NULL) labels,
	(SELECT  IF(COUNT(c.id) ,JSON_ARRAYAGG(
	JSON_OBJECT("id",c.id,"content",c.content,"commentId",c.comment_id,"createTime",c.createAt,"user",
	JSON_OBJECT("id",u2.id,"name",u2.username,"avatar",u2.avatar_url)) 
	
 ),NULL) FROM comment c LEFT JOIN user u2 ON c.user_id = u2.id WHERE m.id = c.moment_id) comments,
 (SELECT JSON_ARRAYAGG(CONCAT("http://localhost:3555/moment/images/",file.filename)) FROM file 
 WHERE m.id = file.moment_id) images
FROM moment m
 LEFT JOIN user u ON m.user_id = u.id 

 LEFT JOIN moment_label ml ON ml.moment_id = m.id
 LEFT JOIN label la ON la.id = ml.label_id
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

        state = `${userMomentFrag} WHERE m.user_id = ? GROUP BY m.id LIMIT ${pageStart},${length};`
        
        const res = await connection.execute(state, [id])
      
        return res[0]
      } 
      else {
       
        state = ` ${userMomentFrag}
        GROUP BY m.id LIMIT ${pageStart},${length};
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
  async hasLabel(momentId,labelId) {
    const state = `
    SELECT * FROM moment_label WHERE moment_id = ? AND label_id = ?;
    `
    try {
       const [res] = await connection.execute(state,[momentId,labelId])
    return res[0] ? true : false
    } catch (error) {
      
    }
   
  }
  async momentAddLabel(momentId,labelId) {
    const state = `
    INSERT INTO moment_label(moment_id,label_id) VALUES(?,?); 
    `
    try {
        const [res] = await connection.execute(state,[momentId,labelId])
        return res[0]
    } catch (error) {
      
    }
  }
}

module.exports = new MonmentService()