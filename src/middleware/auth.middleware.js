const { checkResource } = require("../service/auth.service")
const { FORBIDDEN_UPDATE } = require("../constants/error.type")

const checkUserPermission = async (ctx,next) => {
    const userId = ctx.user.id;
    let [resourceKey] = Object.keys(ctx.params)
    const resourceId = ctx.params[resourceKey]
    const tableName = resourceKey.replace("Id","")
    try {
        const res = await checkResource(tableName,userId,resourceId)
        
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