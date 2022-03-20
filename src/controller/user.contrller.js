const {createUser} = require("../service/user.service")

class UserController {
    async register(ctx, next) {
        console.log(ctx.request.body);
        const {user_name,password} = ctx.request.body
        const res = await createUser(user_name,password)
        ctx.body = "用户注册成功"
    }
    async login(ctx, next) {
        ctx.body = "登录成功"
    }
}
module.exports = new UserController()