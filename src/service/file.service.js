const connection = require("../model")

class FileService {
    async createAvatar(mimeType,filename,size,userId) {

        
        const state = `
        INSERT INTO avatar(mimeType,filename,size,user_id) VALUES(?,?,?,?);
        `
        try {
           
            const res = await connection.execute(state,[mimeType,filename,size,userId])
            
            return res;
        } catch (error) {
            
        }
    }
    async getAvatarByUserId(userId) {
        const state = `
        SELECT * FROM avatar WHERE user_id = ${userId};
        `
        try {
            const [res] = await connection.execute(state)
            
                return res[0]
        } catch (error) {
            
        }
    }
    async getPictureByMomentId(momentId,userId) {
        const state = `
        SELECT * FROM file WHERE moment_id = ? AND user_id = ?;
        `
        try {
            const [res] = await connection.execute(state,[momentId,userId])

                return res[0]
        } catch (error) {
            
        }
    }
    async createMomentPicture(mimeType,filename,size,userId,momentId) {
        const state = `
        INSERT INTO file(mimeType,filename,size,user_id,moment_id) VALUES(?,?,?,?,?);
        `
        try {
           
            const res = await connection.execute(state,[mimeType,filename,size,userId,momentId])
            
            return res;
        } catch (error) {
            
        }
    }
    async deleteMomentPicture(momentId,userId) {
        const state = `
        DELETE FROM file WHERE moment_id = ? AND user_id = ?;
        `
        try {
            const res = await connection.execute(state,[momentId,userId])

                return res[0]
        } catch (error) {
            
        }
    }
    async getPictureByFilename(filename) {
        const state = `
        SELECT * FROM file WHERE filename = ?;
        `
        try {
            const [res] = await connection.execute(state,[filename])
                    
                return res[0]
        } catch (error) {
            
        }
    }
}

module.exports = new FileService()