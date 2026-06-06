const express = require("express");
const router = express.Router();

const {
  createSiteVisit,
  getAllSiteVisits,
  getSiteVisitById,
  updateSiteVisitStatus,
  toggleMarked,
  deleteSiteVisit,
} = require("../controllers/sitevisit.controller");

// Public Route
router.post("/", createSiteVisit);

// Admin Routes
router.get("/", getAllSiteVisits);
router.get("/:id", getSiteVisitById);
router.patch("/:id/status", updateSiteVisitStatus);
router.patch("/:id/mark", toggleMarked);
router.delete("/:id", deleteSiteVisit);

module.exports = router;
