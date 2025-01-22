import express  from 'express'

import * as postCntrl from './post.controller.js'
import { upload } from "../../middleware/multer.js"
import isLoggedIn  from '../../middleware/auth.js'

const router = express.Router()

router.use(isLoggedIn)

router.get("/all", postCntrl.allPosts)
router.get("/users", postCntrl.userPosts)
router.get("/:id", postCntrl.getPostById)
router.post("/", upload.single('imageUrl'), postCntrl.createPost)
router.patch("/:id", upload.single('imageUrl'), postCntrl.updatePostById)
router.delete("/:id", postCntrl.deletePostById)

export default  router;