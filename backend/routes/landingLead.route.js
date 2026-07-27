const express = require("express");
const {
  sendLandingOtp,
  verifyLandingOtp,
} = require("../controllers/landingLead.controller");

const router = express.Router();

router.post("/send-otp", sendLandingOtp);
router.post("/verify-otp", verifyLandingOtp);

module.exports = router;
