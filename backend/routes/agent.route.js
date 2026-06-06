const express = require("express");
const router = express.Router();

const {
  createAgent,
  getAllAgents,
  getAgentById,
  updateAgentStatus,
  deleteAgent,
} = require("../controllers/agent.controller");

// Public Route
router.post("/", createAgent);

// Admin Routes
router.get("/", getAllAgents);
router.get("/:id", getAgentById);
router.patch("/:id/status", updateAgentStatus);
router.delete("/:id", deleteAgent);

module.exports = router;
