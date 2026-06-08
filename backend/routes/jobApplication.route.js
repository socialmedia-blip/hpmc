const express = require("express");
const router = express.Router();
const multer = require("multer");

const storage = require("../config/storage");
const upload = multer({ storage });

const {
  createApplication,
  getAllApplications,
  getApplicationById,
  updateApplicationStatus,
  deleteApplication,
} = require("../controllers/jobApplication.controller");

// Public
router.post("/", upload.single("resume"), createApplication);

// Admin
router.get("/", getAllApplications);
router.get("/:id", getApplicationById);
router.patch("/:id/status", updateApplicationStatus);
router.delete("/:id", deleteApplication);

module.exports = router;
