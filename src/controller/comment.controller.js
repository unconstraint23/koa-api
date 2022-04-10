
const { createMoment,replyComment,updateComment,removeComment } = require("../service/comment.service")
class CommentController {
    async create(ctx,next) {
        const req = ctx.request.body
        req.user = ctx.user
        try {
         const res = await createMoment(req)
        ctx.body = res;   
        } catch (error) {
            
        }
        
    }
    async reply(ctx, next) {
        const req = ctx.request.body;
        const {commentId} = ctx.params;
        
        req.user = ctx.user;
        req.commentId = Number(commentId)
      
        try {
           const res = await replyComment(req)
           ctx.body = res;
        } catch (error) {
            
        }
        
    }
    async updateComment(ctx, next) {
        const req = ctx.request.body;
        const {commentId} = ctx.params
        req.user = ctx.user;
        req.commentId = Number(commentId)
        
        try {
            const res = await updateComment(req)
            ctx.body = res
        } catch (error) {
            
        }
    }
    async deleteComment(ctx,next) {
        
        let {commentId} = ctx.params
       
        
        commentId = Number(commentId)
        try {
            const res = await removeComment(commentId)
            ctx.body = res
        } catch (error) {
            
        }
    }
}

module.exports = new CommentController()