const Router = require("koa-router");
const { saveAvatarInfo,savePictureInfo } = require("../controller/file.controller");
const { avatarHandler, pictureHandler, pictureJimpSize } = require("../middleware/file.middleware");
const { checkToken } = require("../middleware/validator");

const router = new Router({prefix: "/uploads"})

router.post("/avatar",checkToken,avatarHandler,saveAvatarInfo)
router.post("/picture/:momentId",checkToken,pictureHandler,pictureJimpSize,savePictureInfo)
module.exports = router;