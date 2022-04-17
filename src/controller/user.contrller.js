const fs = require("fs")
const path = require("path")
const {createUser} = require("../service/user.service")
const {PRIVATE_KEY} = require("../config/config.default")
const jwt = require("../util/jwt")
const { getAvatarByUserId } = require("../service/file.service")
const { AVATAR_PATH } = require("../constants/file.type")
class UserController {
    async register(ctx, next) {
        
        const userInfo = ctx.request.body
        const res = await createUser(userInfo)
        ctx.body = res
    }
    async login(ctx, next) {
        const {id,username} = ctx.user
        try {
           const token = await jwt.sign({id,username},PRIVATE_KEY,
            {expiresIn: 60*60,
                algorithm:"RS256"
            })
        ctx.body = {
            id,username,token
        }
        } catch (error) {
            
        }
        
    }
    async hasLogin(ctx,next) {
        ctx.body = "login success" 
    }
    async getUserAvatar(ctx, next) {
        
       let { userId } = ctx.params
        userId = +userId
        try {
           const avatarInfo = await getAvatarByUserId(userId)
          
           ctx.set("content-type",avatarInfo.mimeType)
            
           ctx.body = fs.createReadStream(`${AVATAR_PATH}/${avatarInfo.filename}`)
        } catch (error) {
            
        }
    }
}
module.exports = new UserController()