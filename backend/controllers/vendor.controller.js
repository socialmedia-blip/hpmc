const Vendor = require("../models/vendor.model");
const sendEmail = require("../utils/sendEmail");

// Create Vendor Registration
exports.createVendor = async (req, res) => {
  try {
    const vendor = await Vendor.create(req.body);

    // Admin Notification
    await sendEmail({
      to: "chandangomia2812@gmail.com",
      subject: "New Vendor Registration - HPMC",
      html: `
        <h2>New Vendor Registration</h2>

        <p><strong>Name:</strong> ${vendor.name}</p>
        <p><strong>Email:</strong> ${vendor.email}</p>
        <p><strong>Phone:</strong> ${vendor.phone}</p>

        <hr/>

        <p><strong>Company:</strong> ${vendor.companyName}</p>
        <p><strong>GST:</strong> ${vendor.gstNumber || "-"}</p>
        <p><strong>PAN:</strong> ${vendor.panNumber || "-"}</p>
        <p><strong>Business Type:</strong> ${vendor.businessType}</p>

        <hr/>

        <p><strong>Address:</strong> ${vendor.address}</p>
        <p><strong>City:</strong> ${vendor.city}</p>
        <p><strong>State:</strong> ${vendor.state}</p>
        <p><strong>Country:</strong> ${vendor.country}</p>
        <p><strong>Pincode:</strong> ${vendor.pincode || "-"}</p>

        <hr/>

        <p><strong>Products / Services:</strong></p>
        <p>${vendor.productsServices}</p>

        <p><strong>Experience:</strong> ${vendor.experience || "-"} Years</p>

        <p><strong>Website:</strong> ${vendor.website || "-"}</p>

        <p><strong>Message:</strong></p>
        <p>${vendor.message || "-"}</p>
      `,
    });

    res.status(201).json({
      success: true,
      message: "Vendor registration submitted successfully",
      data: vendor,
    });
  } catch (error) {
    console.error("Create Vendor Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Vendors
exports.getAllVendors = async (req, res) => {
  try {
    const vendors = await Vendor.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: vendors.length,
      data: vendors,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Single Vendor
exports.getVendorById = async (req, res) => {
  try {
    const vendor = await Vendor.findById(req.params.id);

    if (!vendor) {
      return res.status(404).json({
        success: false,
        message: "Vendor not found",
      });
    }

    res.status(200).json({
      success: true,
      data: vendor,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Vendor Status
exports.updateVendorStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const vendor = await Vendor.findByIdAndUpdate(
      req.params.id,
      { status },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!vendor) {
      return res.status(404).json({
        success: false,
        message: "Vendor not found",
      });
    }

    let statusMessage = "";

    switch (status) {
      case "approved":
        statusMessage =
          "Congratulations! Your vendor application has been approved.";
        break;

      case "under_review":
        statusMessage =
          "Your vendor application is currently under review by our procurement team.";
        break;

      case "rejected":
        statusMessage =
          "Thank you for your interest. Currently we are unable to proceed with your vendor application.";
        break;

      default:
        statusMessage =
          "Your vendor application has been received successfully.";
    }

    // Applicant Notification
    await sendEmail({
      to: vendor.email,
      subject: "Vendor Registration Update - HPMC",
      html: `
        <h2>Hello ${vendor.name},</h2>

        <p>${statusMessage}</p>

        <p>
          <strong>Current Status:</strong>
          ${status.replace("_", " ").toUpperCase()}
        </p>

        <p>
          Thank you for your interest in working with HPMC.
        </p>
      `,
    });

    res.status(200).json({
      success: true,
      message: "Vendor status updated successfully",
      data: vendor,
    });
  } catch (error) {
    console.error("Update Vendor Status Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Vendor
exports.deleteVendor = async (req, res) => {
  try {
    const vendor = await Vendor.findByIdAndDelete(req.params.id);

    if (!vendor) {
      return res.status(404).json({
        success: false,
        message: "Vendor not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Vendor deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
