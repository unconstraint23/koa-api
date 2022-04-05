
const { createMonment,getUserMoment } = require("../service/monment.service")

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
        const {id} = ctx.params
        try {
            const res = await getUserMoment(Number(id))
           ctx.body = res 
        } catch (error) {
            
        }
        
    }
}

module.exports = new MomentCroller()