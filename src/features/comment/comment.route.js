import express from "express"

const router = express.Router()

//Imports all function here
import isLoggedIn from "../../middleware/auth.js"
import * as commentCntrl from "./comment.controller.js"    

router.use(isLoggedIn)

router.get("/:pId", commentCntrl.getCommentByPid)
router.post("/:pId", commentCntrl.postCommentById)
router.patch("/:id", commentCntrl.updateCommentById)
router.delete("/:id", commentCntrl.deleteCommentById)

export default router
