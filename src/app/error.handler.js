
const errorType = require("../constants/error.type")

const errorHandler = (error, ctx) => {
    let status,message;
   
    switch(error.message) {
        case errorType.NAME_OR_PASSWORD_IS_REQUIRED: 
       
         status = 400;
         message = "用户名或密码不能为空"
         break;
        case errorType.USER_HAS_EXISTS: 
            status = 409;
         message = "此用户已存在"
         break;
        case errorType.USER_NOT_EXISTS:
            status = 400;
            message = "用户不存在"
         break;
         case errorType.PWD_ERROR:
            status = 400;
            message = "密码错误"
         break;
         case errorType.UNAUTHORIZATION: 
            status = 401
            message = "未授权或凭证已过期";
            break
        default: 
            status = 404;
            message = "Not Found"
    }
    ctx.status = status
    ctx.body = message
}
module.exports = {
    errorHandler
}