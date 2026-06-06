const express = require("express");
const router = express.Router();

const {
  createVendor,
  getAllVendors,
  getVendorById,
  updateVendorStatus,
  deleteVendor,
} = require("../controllers/vendor.controller");

// Public Route
router.post("/", createVendor);

// Admin Routes
router.get("/", getAllVendors);
router.get("/:id", getVendorById);
router.patch("/:id/status", updateVendorStatus);
router.delete("/:id", deleteVendor);

module.exports = router;
