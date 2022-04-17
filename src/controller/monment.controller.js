const fs = require("fs")
const { PICTURE_PATH } = require("../constants/file.type")
const { getPictureByFilename } = require("../service/file.service")
const { labelIsAdd } = require("../service/label.service")
const { createMonment,getUserMoment,updateUserMonent,momentAddLabel } = require("../service/monment.service")

class MomentCroller {
    async create(ctx,next) {
        const {id} = ctx.user
        const {content} = ctx.request.body
        let obj = {
            id,content
        }
        try {
            let res = await createMonment(obj)
            ctx.body = res;
        } catch (error) {
            
        }
    }
    /**
     * 这是一个列表查询（条件筛选）
     * 
     */
    async getDetail(ctx,next) {
      
        let req = ctx.request.body
       
        try {
            const res = await getUserMoment(req)
           ctx.body = res 
        } catch (error) {
            
        }
        
    }
    async updateMoment(ctx, next) {
        let req = ctx.request.body;
        let {momentId} = ctx.params
        req.momentId = Number(momentId)
        try {
            const res = await updateUserMonent(req)
            ctx.body = res;
        } catch (error) {
            
        }
    }
    async addLabels(ctx, next) {
        const { labels } = ctx;
        const {momentId} = ctx.params
        console.log(momentId)
        try {
           for (const label of labels) {
            const labelId = +label.id
            const res = await labelIsAdd(Number(momentId),labelId)
            
            if(!res) {
                await momentAddLabel(Number(momentId),labelId)
            }
        }
        ctx.body = {
            status: "success",
            message: "标签添加成功"
        } 
        } catch (error) {
            
        }
        
    }
    async getPictureInfo(ctx,next) {
        let { filename } = ctx.params;
        
        try {
            const {type} = ctx.query;
            
            
            const res = await getPictureByFilename(filename)
            console.log(res)
            const types = ["small","mid","large"]
            if(types.some(item => item == type)) {
                filename += `-${type}`
            }
            
            ctx.set("content-type",res.mimeType)
            ctx.body = fs.createReadStream(`${PICTURE_PATH}/${filename}`)
        } catch (error) {
            
        }
    }
}

module.exports = new MomentCroller()