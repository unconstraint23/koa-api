const Koa = require("koa")
const KoaBody = require("koa-body")
const app = new Koa()

app.use(KoaBody())

module.exports = app