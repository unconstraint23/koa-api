
const Router = require("koa-router")
const {APP_PORT} = require("./config/config.default")
const app = require("./app") 
const router = new Router();

router.get('/', (ctx, next) => {
  // ctx.router available
  ctx.body = "jiekou"
});

app
  .use(router.routes())
  .use(router.allowedMethods());


  app.listen(APP_PORT,() => {
    console.log(`server is start on http://localhost:${APP_PORT}`)
})