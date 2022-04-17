const Router = require("koa-router");

const router = new Router({prefix: "/label"})

const { createLabel } = require("../controller/label.controller")

router.post("/create",createLabel)

module.exports = router