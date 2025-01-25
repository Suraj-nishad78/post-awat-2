import express  from 'express'

import * as userCntrl  from './user.controller.js'
import { upload } from "../../middleware/multer.js"
import isLoggedIn  from '../../middleware/auth.js'

const router = express.Router()


router.post("/signup", userCntrl.signupUser)
router.post("/signin", userCntrl.loginUser)
router.get("/logout", isLoggedIn, userCntrl.logoutUser)
router.get("/logout-all-devices", isLoggedIn, userCntrl.logoutUser)

router.get("/get-all-details", userCntrl.allUsers)
router.get("/get-all-details/:userId",  userCntrl.getUserDetails)
router.patch("/update-details/:userId", isLoggedIn,  upload.single('imageUrl'), userCntrl.updateUserDetails)

export default router;
