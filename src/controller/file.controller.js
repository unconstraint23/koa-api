const { APP_HOST, APP_PORT } = require("../config/config.default");
const { AVATAR_PATH } = require("../constants/file.type");
const { createAvatar,getAvatarByUserId, getPictureByMomentId, createMomentPicture, deleteMomentPicture } = require("../service/file.service")
const { updateUserAvatar } = require("../service/user.service")

 
 
 class FileController {
     async saveAvatarInfo(ctx, next) {
         
         const { mimetype,filename,size } = ctx.req.file
         const { id } = ctx.user
        try {
            const isupload = await getAvatarByUserId(id)
            let message;
            if(!isupload) {
                const res = await createAvatar(mimetype,filename,size,id);
            
            
            message = "上传成功"
            } else {
                message = "修改成功"
            }
            const avaUrl = `${APP_HOST}:${APP_PORT}/user/${id}/avatar`
            const uploadres = await updateUserAvatar(avaUrl,id)
            
            ctx.body = {
                status: "success",
                messsage: message
            }
        } catch (error) {
            
        }
     }
     async savePictureInfo(ctx, next) {
        const files = ctx.req.files
        let { id } = ctx.user
        let { momentId } = ctx.params;
        momentId = +momentId
        id = +id
        console.log(files,momentId,"savepicture")
      
        let message;
        try {
            const isupload = await getPictureByMomentId(momentId,id)
            if(isupload) {
               await deleteMomentPicture(momentId,id)
            } 
                for (const file of files) {
                const { mimetype,filename,size } = file
                await createMomentPicture(mimetype,filename,size,id,momentId)
              } 
            
             message = "上传成功"
            ctx.body = {
                status: "success",
                message: message
            }
        } catch (error) {
            
        }
     }
 }

 module.exports = new FileController()