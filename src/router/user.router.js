const Router = require("koa-router")
const router = new Router({prefix: "/user"});

const {register,login, hasLogin, getUserAvatar} = require("../controller/user.contrller");
const { registerValidate, passwordHandler,loginValidate,checkToken } = require("../middleware/validator");

router.post("/register",registerValidate,passwordHandler,register)
router.post("/login",loginValidate,login)
router.get("/checkLogin",checkToken,hasLogin)
router.get("/:userId/avatar",getUserAvatar)

module.exports = router