import express  from 'express'

import * as friendCntrl from "./friend.controller.js"
import isLoggedIn  from '../../middleware/auth.js'

const router = express.Router()

router.use(isLoggedIn)

router.get("/get-friends/:userId", friendCntrl.getUserFriends)
router.get("/get-pending-requests", friendCntrl.getfriendRequests)
router.get("/toggle-friendship/:friendId", friendCntrl.toggleFriendship)
router.get("/response-to-request/:friendId", friendCntrl.responseToRequest)

export default  router;
