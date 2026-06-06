const Agent = require("../models/agent.model");
const sendEmail = require("../utils/sendEmail");

// Create Agent Request
exports.createAgent = async (req, res) => {
  try {
    const agent = await Agent.create(req.body);

    // Admin Notification
    await sendEmail({
      to: "chandangomia2812@gmail.com",
      subject: "New Agent Registration - HPMC",
      html: `
        <h2>New Agent Registration</h2>

        <p><strong>Name:</strong> ${agent.name}</p>

        <p><strong>Email:</strong> ${agent.email}</p>

        <p><strong>Phone:</strong> ${agent.phone}</p>

        <p><strong>Company:</strong> ${agent.companyName}</p>

        <p><strong>Business Type:</strong> ${agent.businessType}</p>

        <p><strong>Experience:</strong> ${agent.experience || "-"} Years</p>

        <p><strong>Location:</strong> ${agent.city}, ${agent.state}</p>

        <p><strong>Current Products:</strong> ${
          agent.currentProducts || "-"
        }</p>

        <p><strong>Monthly Requirement:</strong> ${
          agent.monthlyRequirement || "-"
        }</p>

        <p><strong>Message:</strong><br/>
        ${agent.message || "-"}</p>
      `,
    });

    res.status(201).json({
      success: true,
      message: "Agent request submitted successfully",
      data: agent,
    });
  } catch (error) {
    console.error("Create Agent Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Agents
exports.getAllAgents = async (req, res) => {
  try {
    const agents = await Agent.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: agents.length,
      data: agents,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Single Agent
exports.getAgentById = async (req, res) => {
  try {
    const agent = await Agent.findById(req.params.id);

    if (!agent) {
      return res.status(404).json({
        success: false,
        message: "Agent not found",
      });
    }

    res.status(200).json({
      success: true,
      data: agent,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Agent Status
exports.updateAgentStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const agent = await Agent.findByIdAndUpdate(
      req.params.id,
      { status },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!agent) {
      return res.status(404).json({
        success: false,
        message: "Agent not found",
      });
    }

    let statusMessage = "";

    switch (status) {
      case "approved":
        statusMessage =
          "Congratulations! Your agent application has been approved.";
        break;

      case "contacted":
        statusMessage =
          "Our team has reviewed your application and will contact you shortly.";
        break;

      case "rejected":
        statusMessage =
          "Thank you for your interest. Currently we are unable to proceed with your application.";
        break;

      default:
        statusMessage = "Your application is currently under review.";
    }

    // Applicant Email
    await sendEmail({
      to: agent.email,
      subject: "Agent Application Update - HPMC",
      html: `
        <h2>Hello ${agent.name},</h2>

        <p>${statusMessage}</p>

        <p>
          <strong>Current Status:</strong>
          ${status.toUpperCase()}
        </p>

        <p>
          Thank you for your interest in partnering with HPMC.
        </p>
      `,
    });

    res.status(200).json({
      success: true,
      message: "Status updated successfully",
      data: agent,
    });
  } catch (error) {
    console.error("Update Agent Status Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Agent
exports.deleteAgent = async (req, res) => {
  try {
    const agent = await Agent.findByIdAndDelete(req.params.id);

    if (!agent) {
      return res.status(404).json({
        success: false,
        message: "Agent not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Agent deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
