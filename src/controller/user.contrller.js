const {createUser} = require("../service/user.service")
const {PRIVATE_KEY} = require("../config/config.default")
const jwt = require("../util/jwt")
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
}
module.exports = new UserController()