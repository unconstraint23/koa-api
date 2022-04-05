const Koa = require("koa")
const KoaBody = require("koa-body")
const {errorHandler} = require("../app/error.handler")
const {registerRoute} = require("../router")
const app = new Koa()

app.use(KoaBody())

registerRoute(app);

app.on("error",errorHandler)
module.exports = app