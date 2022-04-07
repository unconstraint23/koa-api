const { userAndMonentId } = require("../service/auth.service")
const { FORBIDDEN_UPDATE } = require("../constants/error.type")

const checkUserPermission = async (ctx,next) => {
    const userId = ctx.user.id;
    const {momentId} = ctx.request.body
    try {
        const res = await userAndMonentId(userId,momentId)
        console.log(res);
        if(!res.length) {
            const error = new Error(FORBIDDEN_UPDATE);
            return ctx.app.emit("error",error,ctx)
        }
        await next()
    } catch (error) {
        
    }
    

}


module.exports = {
    checkUserPermission
}