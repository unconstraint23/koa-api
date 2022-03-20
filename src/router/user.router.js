const Router = require("koa-router")
const router = new Router({prefix: "/user"});
router.get('/', (ctx, next) => {
  // ctx.router available
  ctx.body = "jiekou"
});

module.exports = router