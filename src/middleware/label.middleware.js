

const { getLabelByName, newLabel } = require("../service/label.service")

const verifyLabelExists = async (ctx, next) => {
    const { labels } = ctx.request.body
    
    try {
        const newLabels = []
        for (let name of labels) {
           
            const isExist = await getLabelByName(name)
            
            const label = { name }
            
            if (isExist) {
                label.id = isExist.id
            } else {
                const res = await newLabel(name)
                label.id = res.insertId
            }
            newLabels.push(label)
        }
        ctx.labels = newLabels
        await next()
    } catch (error) {

    }

}

module.exports = {
    verifyLabelExists
}