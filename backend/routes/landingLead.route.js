const express = require("express");
const {
  sendLandingOtp,
  verifyLandingOtp,
  getLandingLeads,
  deleteLandingLead,
} = require("../controllers/landingLead.controller");

const router = express.Router();

router.post("/send-otp", sendLandingOtp);
router.post("/verify-otp", verifyLandingOtp);
router.get("/", getLandingLeads);
router.delete("/:id", deleteLandingLead);

module.exports = router;
