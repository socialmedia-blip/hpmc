const express = require("express");
const router = express.Router();

const {
  createCareer,
  getAllCareers,
  getActiveCareers,
  getCareerById,
  updateCareer,
  toggleCareerStatus,
  deleteCareer,
} = require("../controllers/career.controller");

// Public
router.get("/active", getActiveCareers);
router.get("/:id", getCareerById);

// Admin
router.post("/", createCareer);
router.get("/", getAllCareers);
router.put("/:id", updateCareer);
router.patch("/:id/toggle", toggleCareerStatus);
router.delete("/:id", deleteCareer);

module.exports = router;
