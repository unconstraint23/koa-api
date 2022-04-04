
const {NAME_OR_PASSWORD_IS_REQUIRED,USER_HAS_EXISTS} = require("../constants/error.type")
const { getUserByUserName } = require("../service/user.service")
const md5 = require("../util/md5")
const registerValidate = async (ctx,next) => {
  try {
      const userInfo = ctx.request.body
      const {username,password} = userInfo
      if(!username || !password) {
       
       const error = new Error(NAME_OR_PASSWORD_IS_REQUIRED);
       return ctx.app.emit("error",error,ctx)
   } 
      const res = await getUserByUserName(userInfo)
      
      if(res.length) {
        const error = new Error(USER_HAS_EXISTS);
        return ctx.app.emit("error",error,ctx)
      }
      
     await next()  
    } catch (error) {
        
    }

}

const passwordHandler = async (ctx,next) => {
  let userInfo = ctx.request.body
    const {password} = userInfo
  userInfo.password = md5(password)   
  await next()
}
module.exports = {
    registerValidate,
    passwordHandler
}