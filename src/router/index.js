const fs = require("fs")

const registerRoute = function(app) {
    fs.readdirSync(__dirname).forEach(file => {
        if(file == "index.js")
            return;
        const router = require(`./${file}`)
        app.use(router.routes())
        .use(router.allowedMethods());
    })
}

module.exports = {
    registerRoute
}