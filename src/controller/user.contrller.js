const {createUser} = require("../service/user.service")

class UserController {
    async register(ctx, next) {
        console.log(ctx.request.body);
        const userInfo = ctx.request.body
        const res = await createUser(userInfo)
        ctx.body = res
    }
    async login(ctx, next) {
        ctx.body = "登录成功"
    }
}
module.exports = new UserController()