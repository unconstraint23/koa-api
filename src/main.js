
const Router = require("koa-router")
const {APP_PORT} = require("./config/config.default")
const app = require("./app") 
// const router = new Router();
const router = require("./router/user.router")

app
  .use(router.routes())
  .use(router.allowedMethods());


  app.listen(APP_PORT,() => {
    console.log(`server is start on http://localhost:${APP_PORT}`)
})