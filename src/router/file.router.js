const Router = require("koa-router");
const { saveAvatarInfo,savePictureInfo } = require("../controller/file.controller");
const { avatarHandler, pictureHandler } = require("../middleware/file.middleware");
const { checkToken } = require("../middleware/validator");

const router = new Router({prefix: "/uploads"})

router.post("/avatar",checkToken,avatarHandler,saveAvatarInfo)
router.post("/picture/:momentId",checkToken,pictureHandler,savePictureInfo)
module.exports = router;