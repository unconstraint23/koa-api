
const connection = require("../model")

class LabelService {
    async newLabel(name) {
       
        const state = `
        INSERT INTO label (name) VALUES(?);
        `
        try {
            const [res] = await connection.execute(state,[name])
            return res
        } catch (error) {
            
        }
    }
    async getLabelByName(name) {
        const state = `
        SELECT * FROM label WHERE name = ?;
        `
        try {
          const [res] = await connection.execute(state,[name])
          return res[0]
        } catch (error) {
            
        }
    }
    async labelIsAdd(momentId,labelId) {
        const state = `
        SELECT * FROM moment_label WHERE moment_id = ? AND label_id = ?;
        `
        try {
            const [res] = await connection.execute(state,[momentId,labelId])
            return res[0]
        } catch (error) {
            
        }
    }
}

module.exports = new LabelService()