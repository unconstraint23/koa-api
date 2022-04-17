const Router = require("koa-router");
const { create,reply,updateComment,deleteComment,getListById } = require("../controller/comment.controller");
const { checkUserPermission } = require("../middleware/auth.middleware");
const { checkToken } = require("../middleware/validator");


const router = new Router({prefix: "/comment"});


router.get("/list/:momentId",getListById)
router.post("/create",checkToken,create)
router.post("/:commentId/reply",checkToken,reply)

router.patch("/:commentId/update",checkToken,checkUserPermission,updateComment)

router.delete("/:commentId/delete",checkToken,checkUserPermission,deleteComment)

module.exports = router