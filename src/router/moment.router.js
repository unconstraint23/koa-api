const Router = require("koa-router")
const {create, getDetail,updateMoment} = require("../controller/monment.controller")
const { checkToken } = require("../middleware/validator")
const { checkUserPermission } = require("../middleware/auth.middleware")

const router = new Router({prefix: "/moment"});

router.post("/create",checkToken,create)

router.post("/detail",getDetail)

router.patch("/update",checkToken,checkUserPermission,updateMoment)

module.exports = router