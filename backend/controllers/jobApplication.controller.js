const JobApplication = require("../models/jobApplication.model");
const sendEmail = require("../utils/sendEmail");

// Submit Resume
exports.createApplication = async (req, res) => {
  try {
    const {
      careerId,
      name,
      email,
      phone,
      currentLocation,
      experience,
      currentCompany,
      currentCTC,
      expectedCTC,
      noticePeriod,
      coverLetter,
    } = req.body;

    // Required Fields
    if (!name || !email || !phone) {
      return res.status(400).json({
        success: false,
        message: "Name, Email and Phone are required",
      });
    }

    // Resume Required
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Resume is required",
      });
    }

    let resumeUrl;

    if (req.file.secure_url) {
      resumeUrl = req.file.secure_url;
    } else if (req.file.path) {
      resumeUrl = req.file.path;
    } else {
      return res.status(400).json({
        success: false,
        message: "Resume upload failed",
      });
    }

    const application = await JobApplication.create({
      careerId: careerId || null,
      name,
      email,
      phone,
      currentLocation,
      experience,
      currentCompany,
      currentCTC,
      expectedCTC,
      noticePeriod,
      coverLetter,
      resumeUrl,
    });

    // Admin Email
    await sendEmail({
      to: "chandangomia2812@gmail.com",
      subject: "New Job Application - HPMC",
      html: `
        <h2>New Job Application Received</h2>

        <p><strong>Name:</strong> ${application.name}</p>

        <p><strong>Email:</strong> ${application.email}</p>

        <p><strong>Phone:</strong> ${application.phone}</p>

        <p><strong>Current Location:</strong>
        ${application.currentLocation || "-"}</p>

        <p><strong>Experience:</strong>
        ${application.experience || "-"}</p>

        <p><strong>Current Company:</strong>
        ${application.currentCompany || "-"}</p>

        <p><strong>Current CTC:</strong>
        ${application.currentCTC || "-"}</p>

        <p><strong>Expected CTC:</strong>
        ${application.expectedCTC || "-"}</p>

        <p><strong>Notice Period:</strong>
        ${application.noticePeriod || "-"}</p>

        <p><strong>Cover Letter:</strong></p>

        <p>${application.coverLetter || "-"}</p>

        <p>
          <strong>Resume:</strong>
          <a href="${application.resumeUrl}" target="_blank">
            View Resume
          </a>
        </p>
      `,
    });

    // Candidate Email
    await sendEmail({
      to: application.email,
      subject: "Application Received - HPMC",
      html: `
        <h2>Hello ${application.name},</h2>

        <p>
          Thank you for applying at HPMC.
        </p>

        <p>
          We have successfully received your application.
        </p>

        <p>
          Our HR team will review your profile and
          contact you if your qualifications match
          our requirements.
        </p>

        <p>
          Thank you for your interest in joining HPMC.
        </p>
      `,
    });

    res.status(201).json({
      success: true,
      message: "Application submitted successfully",
      data: application,
    });
  } catch (error) {
    console.error("Application Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Applications
exports.getAllApplications = async (req, res) => {
  try {
    const applications = await JobApplication.find().populate("careerId").sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: applications.length,
      data: applications,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Single Application
exports.getApplicationById = async (req, res) => {
  try {
    const application = await JobApplication.findById(req.params.id).populate(
      "careerId",
    );

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    res.status(200).json({
      success: true,
      data: application,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Application Status
exports.updateApplicationStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const application = await JobApplication.findByIdAndUpdate(
      req.params.id,
      { status },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    await sendEmail({
      to: application.email,
      subject: "Application Status Update",
      html: `
        <h2>Hello ${application.name},</h2>

        <p>Your application status has been updated.</p>

        <p>
          <strong>Status:</strong>
          ${status.toUpperCase()}
        </p>
      `,
    });

    res.status(200).json({
      success: true,
      message: "Status updated successfully",
      data: application,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Application
exports.deleteApplication = async (req, res) => {
  try {
    const application = await JobApplication.findByIdAndDelete(req.params.id);

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Application deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
