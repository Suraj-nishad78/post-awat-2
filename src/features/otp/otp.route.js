import express from "express";

import isLoggedIn from "../../middleware/auth.js";
import {sendOtpMail} from "../../middleware/nodemailer.js";
import * as otpCntrl from "./otp.controller.js"

const router = express.Router();

router.use(isLoggedIn)

router.get("/send", sendOtpMail, otpCntrl.otpSend)
router.post("/varify", otpCntrl.otpVarify)
router.patch("/reset-password", otpCntrl.resetPassword)

export default router;