
const {NAME_OR_PASSWORD_IS_REQUIRED,USER_HAS_EXISTS, USER_NOT_EXISTS, PWD_ERROR,UNAUTHORIZATION} = require("../constants/error.type")
const { getUserByUserName } = require("../service/user.service")
const md5 = require("../util/md5")
const jwt = require("../util/jwt")
const { PUBLIC_KEY } = require("../config/config.default")
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

const loginValidate = async (ctx,next) => {
  const userInfo = ctx.request.body
  const {username,password} = userInfo
  if(!username || !password) {
    const error = new Error(NAME_OR_PASSWORD_IS_REQUIRED);
    return ctx.app.emit("error",error,ctx)
  } 
  try {
    const res = await getUserByUserName(userInfo)
    const user = res[0]
    console.log(user);
    if(!user) {
      const error = new Error(USER_NOT_EXISTS);
      return ctx.app.emit("error",error,ctx)
    }
    if(!checkPwd(user.password,password)) {
      const error = new Error(PWD_ERROR);
      return ctx.app.emit("error",error,ctx)
    }
    ctx.user = user
    await next()
  } catch (error) {
    
  }
  
}

const checkPwd = (pwd1,pwd2) => {
    if(md5(pwd2) !== pwd1) {
       return false
    }
    return true
}

const checkToken = async (ctx,next) => {

  const authorization = ctx.headers.authorization

  const token = authorization.replace("Bearer ","")
  try {
   const res = await jwt.verify(token,PUBLIC_KEY,{
      algorithms: ["RS256"]
  }) 
  
  ctx.user = res
  await next()
  } catch (error) {
    const err = new Error(UNAUTHORIZATION)
    ctx.app.emit("error",err,ctx)
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
    passwordHandler,
    loginValidate,
    checkToken
}