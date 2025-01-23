import express from "express"

const router = express.Router()

//Imports all function here
import { getLikedPostById, toggleLike} from "./like.controller.js"
import isLoggedIn from "../../middleware/auth.js"

router.use(isLoggedIn)

router.get("/:postId", getLikedPostById)
router.get("/toggle/:postId", toggleLike)

export default router

