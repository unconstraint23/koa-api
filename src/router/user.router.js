const Router = require("koa-router")
const router = new Router({prefix: "/user"});

const {register,login} = require("../controller/user.contrller");
const { registerValidate, passwordHandler } = require("../middleware/validator");

router.post("/register",registerValidate,passwordHandler,register)
router.post("/login",login)

module.exports = router