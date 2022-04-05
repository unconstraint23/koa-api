const Router = require("koa-router")
const {create, getDetail} = require("../controller/monment.controller")
const { checkToken } = require("../middleware/validator")

const router = new Router({prefix: "/moment"});

router.post("/create",checkToken,create)

router.get("/:id",getDetail)

module.exports = router