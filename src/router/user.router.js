const Router = require("koa-router")
const router = new Router({prefix: "/user"});

const {register,login} = require("../controller/user.contrller")

router.post("/register",register)
router.post("/login",login)

module.exports = router