const express = require("express");
const router = express.Router();
const googleBusinessController = require("../controllers/googleBusiness.controller");

router.get("/status", googleBusinessController.getStatus);
router.post("/search", googleBusinessController.searchBusinesses);
router.post("/select", googleBusinessController.selectBusiness);
router.delete("/business", googleBusinessController.removeBusiness);
router.get("/review-stats", googleBusinessController.getReviewStats);
router.get("/competitors", googleBusinessController.getCompetitors);
router.get("/performance", googleBusinessController.getPerformance);
router.get("/sentiment", googleBusinessController.getSentiment);

module.exports = router;
