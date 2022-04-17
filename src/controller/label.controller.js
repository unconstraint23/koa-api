const { newLabel } = require("../service/label.service")

class LabelController {
    async createLabel(ctx,next) {
        const req = ctx.request.body
        try {
            const res = await newLabel(req.name)
            ctx.body = res;
        } catch (error) {
            
        }
    }
}

module.exports = new LabelController()