
const { createMonment,getUserMoment,updateUserMonent } = require("../service/monment.service")

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
       console.log(req);
        try {
            const res = await getUserMoment(req)
           ctx.body = res 
        } catch (error) {
            
        }
        
    }
    async updateMoment(ctx, next) {
        let req = ctx.request.body;
        
        try {
            const res = await updateUserMonent(req)
            ctx.body = res;
        } catch (error) {
            
        }
    }
}

module.exports = new MomentCroller()