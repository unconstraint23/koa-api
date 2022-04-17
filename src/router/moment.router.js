const Router = require("koa-router")
const {create, getDetail,updateMoment,addLabels,getPictureInfo} = require("../controller/monment.controller")
const { checkToken } = require("../middleware/validator")
const { checkUserPermission } = require("../middleware/auth.middleware");
const { verifyLabelExists } = require("../middleware/label.middleware");
const { pictureJimpSize } = require("../middleware/file.middleware");

const router = new Router({prefix: "/moment"});

router.post("/create",checkToken,create)

router.post("/detail",getDetail)

router.patch("/:momentId/update",checkToken,checkUserPermission,updateMoment)

router.post("/:momentId/addLabels",checkToken,checkUserPermission,verifyLabelExists,addLabels)

router.get("/images/:filename",getPictureInfo)

module.exports = router